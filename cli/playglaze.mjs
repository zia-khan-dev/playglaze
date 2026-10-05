#!/usr/bin/env node
// PlayGlaze CLI: pull a PlayGlaze Studio project (theme, screens, PNG assets) into your game.
//   npx playglaze login [token]     save your Studio token
//   npx playglaze pull [project]    download a project into ./playglaze (or --dir)
//   npx playglaze whoami | logout | help
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, chmodSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import { createInterface } from 'node:readline/promises';

// Until the Studio has its public address, point PLAYGLAZE_API (or --api) at your server.
const DEFAULT_API = 'http://127.0.0.1:8787';
const CONFIG = join(homedir(), '.playglaze', 'config.json');
const PROJECT_FILE = 'playglaze.json';

const c = { dim: s => `\x1b[2m${s}\x1b[0m`, bold: s => `\x1b[1m${s}\x1b[0m`, green: s => `\x1b[32m${s}\x1b[0m`, red: s => `\x1b[31m${s}\x1b[0m`, yellow: s => `\x1b[33m${s}\x1b[0m` };

function parse(argv) {
  const args = [], flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const [k, v] = a.slice(2).split('='); flags[k] = v ?? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true); }
    else args.push(a);
  }
  return { cmd: args[0] ?? 'help', args: args.slice(1), flags };
}

const readJson = f => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch { return null; } };
const config = () => readJson(CONFIG) ?? {};
function saveConfig(cfg) {
  mkdirSync(dirname(CONFIG), { recursive: true });
  writeFileSync(CONFIG, JSON.stringify(cfg, null, 2));
  try { chmodSync(CONFIG, 0o600); } catch {}
}
const apiOf = flags => String(flags.api ?? process.env.PLAYGLAZE_API ?? readJson(PROJECT_FILE)?.api ?? config().api ?? DEFAULT_API).replace(/\/$/, '');

async function call(api, path, token) {
  let r;
  try { r = await fetch(api + path, { headers: token ? { authorization: `Bearer ${token}` } : {} }); }
  catch { throw new Error(`Cannot reach ${api}. Is the Studio server running? Use --api <url> to change it.`); }
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body.error ?? `Server answered ${r.status}`);
  return body;
}

async function login({ args, flags }) {
  const api = apiOf(flags);
  let token = args[0] ?? process.env.PLAYGLAZE_TOKEN;
  if (!token) {
    console.log(`Open PlayGlaze Studio → ${c.bold('Export → CLI')} and copy your token.`);
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    token = (await rl.question('Token: ')).trim();
    rl.close();
  }
  const me = await call(api, '/api/me', token);
  saveConfig({ ...config(), token, api });
  console.log(c.green('✓ Logged in') + `  ${me.email ?? 'account ' + me.id} · plan: ${c.bold(me.plan)}`);
}

async function whoami({ flags }) {
  const { token } = config();
  if (!token) throw new Error('Not logged in. Run `npx playglaze login`.');
  const me = await call(apiOf(flags), '/api/me', token);
  console.log(`${me.email ?? 'account ' + me.id} · plan: ${c.bold(me.plan)}`);
}

function logout() {
  if (existsSync(CONFIG)) rmSync(CONFIG);
  console.log('Logged out.');
}

async function pull({ args, flags }) {
  const local = readJson(PROJECT_FILE);
  const id = args[0] ?? local?.project;
  if (!id) throw new Error('Which project? Run `npx playglaze pull <project-id>` (the id is in the Studio under Export → CLI).');
  const { token } = config();
  if (!token) throw new Error('Not logged in. Run `npx playglaze login` first.');
  const api = apiOf(flags);
  const dir = resolve(String(flags.dir ?? local?.dir ?? 'playglaze'));
  const res = await call(api, `/api/projects/${encodeURIComponent(id)}/files`, token);

  for (const f of res.files) {
    const out = resolve(dir, f.path);
    if (out !== dir && !out.startsWith(dir + sep)) throw new Error(`Refusing to write outside ${dir}: ${f.path}`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, f.encoding === 'base64' ? Buffer.from(f.content, 'base64') : f.content);
  }
  writeFileSync(PROJECT_FILE, JSON.stringify({ project: id, dir: String(flags.dir ?? local?.dir ?? 'playglaze'), ...(flags.api ? { api } : {}) }, null, 2) + '\n');

  const pngs = res.files.filter(f => f.path.endsWith('.png')).length;
  console.log(c.green(`✓ Pulled "${res.project.name}"`) + c.dim(` (plan: ${res.plan})`) + ` into ${c.bold(dir)}`);
  console.log(`  ${res.files.length - pngs} source files${pngs ? `, ${pngs} PNG images` : ''}`);
  if (res.locked?.length) console.log(c.yellow(`  In Pro: ${res.locked.join(', ')}`));
  console.log(c.dim('  Next: npm install playglaze react-native-svg — see playglaze/README.md'));
}

function help() {
  console.log(`${c.bold('playglaze')} — get your PlayGlaze Studio project into your game

  ${c.bold('npx playglaze login')} [token]       save your Studio token (Studio → Export → CLI)
  ${c.bold('npx playglaze pull')} [project-id]   download theme, screens and assets
      --dir <folder>                 where to put them (default: ./playglaze)
      --api <url>                    Studio server (default: ${DEFAULT_API}, or $PLAYGLAZE_API)
  ${c.bold('npx playglaze whoami')}              show your account and plan
  ${c.bold('npx playglaze logout')}              forget the token

After the first pull, ${c.bold('npx playglaze pull')} alone updates the same project.`);
}

const opts = parse(process.argv.slice(2));
const run = { login, pull, whoami, logout, help }[opts.cmd];
if (!run) { console.error(c.red(`Unknown command "${opts.cmd}".`)); help(); process.exit(1); }
try { await run(opts); } catch (e) { console.error(c.red('✗ ' + e.message)); process.exit(1); }
