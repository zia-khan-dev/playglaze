// The docs shell: top bar, sidebar menu by group, and one page per component (hash routes: #/gloss-button).
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { bright, dark, Ribbon, RoundButton, Select, Skin, SKINS as FREE_SKINS, ThemeProvider } from '../../src';

// Pro skins live in the private playglaze-pro folder next to this repo. They show only in local builds
// where that folder exists; the public build (this repo alone) has just the free skins.
const proModules = (import.meta as any).glob('../../../playglaze-pro/src/skins/*.ts', { eager: true }) as Record<string, Record<string, unknown>>;
const PRO: Record<string, Skin> = {};
for (const [file, mod] of Object.entries(proModules)) {
  if (file.endsWith('/index.ts')) continue;
  for (const v of Object.values(mod)) if (v && typeof v === 'object' && 'name' in (v as Skin)) PRO[(v as Skin).name] = v as Skin;
}
const SKINS: Record<string, Skin> = { ...FREE_SKINS, ...PRO };
import { PAGES, PageView } from './pages';
import { C, DISPLAY, FONT, Mode, setMode, T } from './ui';

const GROUPS = Array.from(new Set(PAGES.map(p => p.group)));
const slugFromHash = () => {
  const s = (globalThis as any).location?.hash?.replace(/^#\/?/, '') || 'introduction';
  return PAGES.some(p => p.slug === s) ? s : 'introduction';
};

function Menu({ current, go }: { current: string; go: (s: string) => void }) {
  return (
    <View style={{ paddingVertical: 20 }}>
      {GROUPS.map(g => (
        <View key={g} style={{ marginBottom: 18 }}>
          <T size={12} weight="800" color={C.faint} style={{ paddingHorizontal: 24, marginBottom: 4, letterSpacing: 1 }}>{g.toUpperCase()}</T>
          {PAGES.filter(p => p.group === g).map(p => {
            const on = p.slug === current;
            return (
              <Pressable key={p.slug} onPress={() => go(p.slug)} style={({ hovered }: any) => ({
                paddingVertical: 8, paddingHorizontal: 24, borderRightWidth: 3,
                borderRightColor: on ? C.accent : 'transparent',
                backgroundColor: on ? 'rgba(255,182,72,0.12)' : hovered ? C.hover : 'transparent',
              })}>
                <T size={15} weight={on ? '800' : '500'} color={on ? C.accent : C.text}>{p.name}</T>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const store = (globalThis as any).localStorage;
const loadSkin = () => {
  const q = new URLSearchParams((globalThis as any).location?.search ?? '').get('skin');
  if (q && SKINS[q]) return q;
  try { const v = store?.getItem('pg-skin'); return v && SKINS[v] ? v : 'glossy'; } catch { return 'glossy'; }
};

const loadMode = (): Mode => {
  const q = new URLSearchParams((globalThis as any).location?.search ?? '').get('mode');
  if (q === 'light' || q === 'dark') return q;
  try { return store?.getItem('pg-mode') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
};
setMode(loadMode());

const cap = (k: string) => k[0].toUpperCase() + k.slice(1);
const SKIN_OPTIONS = [
  ...Object.keys(FREE_SKINS).map(k => ({ value: k, label: cap(k), group: 'Free' })),
  ...Object.keys(PRO).map(k => ({ value: k, label: cap(k), group: 'Pro', badge: 'PRO' })),
];

export default function App() {
  const { width } = useWindowDimensions();
  const [skin, setSkinName] = useState(loadSkin);
  const [mode, setModeState] = useState<Mode>(loadMode);
  const flipMode = () => {
    const m: Mode = mode === 'dark' ? 'light' : 'dark';
    setMode(m); setModeState(m);
    try { store?.setItem('pg-mode', m); } catch {}
  };
  const setSkin = (k: string) => { setSkinName(k); try { store?.setItem('pg-skin', k); } catch {} };
  const wide = width >= 900;
  const [slug, setSlug] = useState(slugFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const scroll = useRef<ScrollView>(null);
  useEffect(() => {
    const on = () => { setSlug(slugFromHash()); scroll.current?.scrollTo({ y: 0, animated: false }); };
    (globalThis as any).addEventListener?.('hashchange', on);
    return () => (globalThis as any).removeEventListener?.('hashchange', on);
  }, []);
  useEffect(() => {
    const p = PAGES.find(x => x.slug === slug)!;
    (globalThis as any).document && ((globalThis as any).document.title = `${p.title ?? p.name} — PlayGlaze`);
  }, [slug]);
  const go = (s: string) => { (globalThis as any).location.hash = `/${s}`; setMenuOpen(false); };
  const i = PAGES.findIndex(p => p.slug === slug);
  const page = PAGES[i];
  const prev = PAGES[i - 1], next = PAGES[i + 1];

  return (
    <ThemeProvider key={mode} theme={{ ...(SKINS[skin].theme ? {} : mode === 'dark' ? dark : bright), displayFont: DISPLAY, fontFamily: FONT }} skin={SKINS[skin]}>
      <View style={{ height: '100vh' as any, backgroundColor: C.bg, overflow: 'hidden' }}>
        {/* top bar */}
        <View style={{ height: 64, zIndex: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: C.line, backgroundColor: C.side, gap: 12 }}>
          {!wide ? (
            <Pressable onPress={() => setMenuOpen(o => !o)} style={{ padding: 8 }}><Text style={{ color: C.text, fontSize: 22 }}>☰</Text></Pressable>
          ) : null}
          <Pressable onPress={() => go('introduction')}><Ribbon width={150} height={42} title="PlayGlaze" tilt={-2} /></Pressable>
          {wide ? <T size={13} color={C.faint} weight="700">v0.5.0</T> : null}
          <View style={{ flex: 1 }} />
          <Select options={SKIN_OPTIONS} value={skin} onChange={setSkin} width={wide ? 170 : 130} height={38} maxRows={12} />
          <RoundButton icon={mode === 'dark' ? 'sun' : 'moon'} size={38} color={mode === 'dark' ? 'yellow' : 'purple'} onPress={flipMode} />
          <Pressable onPress={() => go('installation')}><T weight="800" color={C.dim}>Docs</T></Pressable>
          <Pressable onPress={() => go('tpl-home')}><T weight="800" color={C.dim}>Templates</T></Pressable>
          <Pressable onPress={() => (globalThis as any).open?.('https://github.com/zia-khan-dev/playglaze', '_blank')}><T weight="800" color={C.dim}>GitHub</T></Pressable>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          {wide ? (
            <ScrollView style={{ width: 250, flexGrow: 0, backgroundColor: C.side, borderRightWidth: 1, borderRightColor: C.line }}>
              <Menu current={slug} go={go} />
            </ScrollView>
          ) : null}
          <ScrollView ref={scroll} style={{ flex: 1, minWidth: 0 }} contentContainerStyle={{ alignItems: 'center', padding: wide ? 40 : 16, paddingBottom: 80 }}>
            <View style={{ width: '100%', maxWidth: 960, minWidth: 0 }}>
              <PageView key={slug} page={page} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 20 }}>
                {prev ? <Pressable onPress={() => go(prev.slug)}><T color={C.faint} size={13}>Previous</T><T weight="800" color={C.accent}>← {prev.name}</T></Pressable> : <View />}
                {next ? <Pressable onPress={() => go(next.slug)} style={{ alignItems: 'flex-end' }}><T color={C.faint} size={13}>Next</T><T weight="800" color={C.accent}>{next.name} →</T></Pressable> : <View />}
              </View>
            </View>
          </ScrollView>
        </View>

        {!wide && menuOpen ? (
          <View style={{ position: 'absolute', top: 64, left: 0, bottom: 0, width: 260, backgroundColor: C.side, borderRightWidth: 1, borderRightColor: C.line, boxShadow: '8px 0 24px rgba(0,0,0,0.5)' }}>
            <ScrollView><Menu current={slug} go={go} /></ScrollView>
          </View>
        ) : null}
      </View>
    </ThemeProvider>
  );
}
