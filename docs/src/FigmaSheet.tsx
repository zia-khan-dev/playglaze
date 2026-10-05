// Figma export sheet (?figma=1&skin=NAME): every component in one skin on a 1200-wide sheet, then a walk of the
// rendered DOM into plain JSON (boxes, gradients, shadows, text, SVG) that the PlayGlaze Figma plugin rebuilds as
// editable layers. The JSON lands in <pre id="figma-dump"> for headless Chrome's --dump-dom.
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Badge, BoosterSlot, Checkbox, CloseButton, Coin, CounterPill, DailyRewardDay, GlossButton, Hearts, Icon, Label,
  LevelSlot, Panel, ProgressBar, ProgressRing, QuestCard, Ribbon, RoundButton, Segmented, Select, ShopTile, Skin, SKINS as FREE,
  Slider, Stars, Tabs, TextField, ThemeProvider, Toggle,
} from '../../src';
import { PRO_DEMOS } from './pro';
import { DISPLAY, FONT } from './ui';

const proModules = (import.meta as any).glob('../../../playglaze-pro/src/skins/*.ts', { eager: true }) as Record<string, Record<string, unknown>>;
const ALL: Record<string, Skin> = { ...FREE };
for (const [f, m] of Object.entries(proModules)) {
  if (f.endsWith('/index.ts')) continue;
  for (const v of Object.values(m)) if (v && typeof v === 'object' && 'name' in (v as Skin)) ALL[(v as Skin).name] = v as Skin;
}

/** react-native-web writes dataSet as data-* attributes. */
const fg = (name: string) => ({ dataSet: { fg: name } } as any);

const COLORS = ['orange', 'yellow', 'red', 'blue', 'purple', 'green', 'pink', 'gray'] as const;

/** One named group on the sheet; the plugin turns it into a Figma frame with this name. */
const Group = ({ name, children, width }: { name: string; children: React.ReactNode; width?: number }) => (
  <View {...fg(name)} style={{ padding: 24, gap: 18, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', width }}>{children}</View>
);

function Sheet() {
  const [t, setT] = useState('a');
  const [s, setS] = useState('easy');
  return (
    <View style={{ width: 1200, padding: 16, gap: 8 }}>
      <Group name="Buttons / colors">{COLORS.map(c => <GlossButton key={c} color={c} title={c} width={130} />)}</Group>
      <Group name="Buttons / sizes">{(['xl', 'lg', 'md', 'sm', 'xs'] as const).map(z => <GlossButton key={z} size={z} title={z} width={z === 'xl' ? 200 : 140} />)}</Group>
      <Group name="Round buttons">
        {(['gear', 'cart', 'user', 'home', 'trophy', 'gift'] as const).map((n, i) => <RoundButton key={n} icon={n} color={COLORS[i]} />)}
        <CloseButton />
      </Group>
      <Group name="Panel" width={420}>
        <Panel title="Paused" onClose={() => {}} style={{ width: 320 }}>
          <View style={{ gap: 12 }}>
            <GlossButton size="md"><Icon name="play" size={28} /></GlossButton>
            <GlossButton size="md" color="blue"><Icon name="refresh" size={26} /></GlossButton>
          </View>
        </Panel>
      </Group>
      <Group name="Ribbons" width={720}>
        <Ribbon width={260} height={70} title="Level 12" />
        <Ribbon width={200} height={56} title="Shop" />
      </Group>
      <Group name="Controls" width={560}>
        <View style={{ width: 240, gap: 16 }}>
          <ProgressBar value={0.65} />
          <ProgressBar value={0.4} color="green" height={26}><Label size={14}>4/10</Label></ProgressBar>
          <Slider value={0.5} />
        </View>
        <View style={{ gap: 14 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}><Toggle value /><Toggle value={false} /></View>
          <View style={{ flexDirection: 'row', gap: 12 }}><Checkbox value /><Checkbox value={false} /></View>
        </View>
      </Group>
      <Group name="Navigation" width={560}>
        <View style={{ width: 300 }}><Tabs items={[{ key: 'a', icon: 'star' }, { key: 'b', icon: 'bolt' }, { key: 'c', icon: 'gift' }]} value={t} onChange={setT} /></View>
        <View style={{ width: 300 }}><Segmented items={[{ key: 'a', label: 'Day' }, { key: 'b', label: 'Week' }, { key: 'c', label: 'All' }]} value="a" /></View>
        <Select options={[{ value: 'easy', label: 'Easy' }]} value={s} onChange={setS} width={220} />
        <View style={{ width: 260 }}><TextField icon="user" placeholder="Player name" /></View>
      </Group>
      <Group name="Game parts">
        <LevelSlot level={1} stars={3} state="done" />
        <LevelSlot level={2} stars={1} state="current" />
        <LevelSlot level={3} state="locked" />
        <ShopTile price="$0.99" color="green"><Coin size={46} /></ShopTile>
        <DailyRewardDay day={3} amount={100} state="today"><Coin size={30} /></DailyRewardDay>
        <BoosterSlot icon="bolt" count={3} />
        <CounterPill value="1,250" icon={<Coin size={40} />} onAdd={() => {}} width={150} />
        <Badge count={5}><RoundButton icon="cart" color="blue" /></Badge>
        <Avatar level={7} />
        <ProgressRing value={0.7} size={80}><Label size={18}>70</Label></ProgressRing>
        <Stars count={2} size={30} />
        <Hearts count={3} />
      </Group>
      <Group name="Cards" width={560}>
        <View style={{ width: 460 }}><QuestCard title="Win 5 levels" progress={3} total={5} reward={<Coin size={28} />} /></View>
      </Group>
      {PRO_DEMOS.length ? (
        <Group name="Pro screens" width={1200}>{PRO_DEMOS.map(({ name, Demo }) => <View key={name} {...fg(name)}><Demo /></View>)}</Group>
      ) : null}
    </View>
  );
}

/* ---------- DOM → JSON ---------- */

type Node = Record<string, unknown> & { children?: Node[] };
const r2 = (n: number) => Math.round(n * 100) / 100;

function walk(el: Element, origin: DOMRect): Node | null {
  const cs = getComputedStyle(el);
  if (cs.display === 'none' || cs.visibility === 'hidden') return null;
  const b = el.getBoundingClientRect();
  if (b.width === 0 && b.height === 0 && el.tagName !== 'svg') return null;
  const n: Node = { x: r2(b.left - origin.left), y: r2(b.top - origin.top), w: r2(b.width), h: r2(b.height) };
  const name = el.getAttribute('data-fg');
  if (name) n.name = name;
  if (el.tagName.toLowerCase() === 'svg') {
    n.svg = (el as SVGElement).outerHTML;
    return n;
  }
  if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') n.bg = cs.backgroundColor;
  if (cs.backgroundImage && cs.backgroundImage !== 'none') n.bgi = cs.backgroundImage;
  if (cs.boxShadow && cs.boxShadow !== 'none') n.shadow = cs.boxShadow;
  const rad = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(v => parseFloat(v) || 0);
  if (rad.some(v => v > 0)) n.radius = rad.map(v => Math.min(v, b.width / 2, b.height / 2));
  const bw = parseFloat(cs.borderTopWidth) || 0;
  if (bw > 0 && cs.borderTopStyle !== 'none') { n.border = bw; n.borderColor = cs.borderTopColor; }
  if (cs.overflow === 'hidden') n.clip = true;
  if (parseFloat(cs.opacity) < 1) n.opacity = parseFloat(cs.opacity);
  const kids: Node[] = [];
  for (const c of Array.from(el.childNodes)) {
    if (c.nodeType === 3) {
      const text = (c.textContent ?? '').trim();
      if (!text) continue;
      const range = document.createRange(); range.selectNodeContents(c);
      const tb = range.getBoundingClientRect();
      kids.push({
        text, x: r2(tb.left - origin.left), y: r2(tb.top - origin.top), w: r2(tb.width), h: r2(tb.height),
        font: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), size: parseFloat(cs.fontSize), weight: cs.fontWeight,
        color: cs.color, tshadow: cs.textShadow !== 'none' ? cs.textShadow : undefined, align: cs.textAlign,
      });
    } else if (c.nodeType === 1) {
      const k = walk(c as Element, origin);
      if (k) kids.push(k);
    }
  }
  const visual = n.bg || n.bgi || n.shadow || n.border || n.clip || n.name;
  if (!visual) return kids.length ? { flat: true, children: kids } as Node : null;
  if (kids.length) n.children = kids;
  return n;
}

/** Collapse pass-through wrappers: their children move up to the parent. */
function flatten(nodes: Node[]): Node[] {
  return nodes.flatMap(k => (k.flat ? flatten(k.children ?? []) : [{ ...k, children: k.children ? flatten(k.children) : undefined }]));
}

export function FigmaExport({ skin }: { skin: string }) {
  const sk = ALL[skin] ?? FREE.glossy;
  useEffect(() => {
    const id = setTimeout(() => {
      const root = document.getElementById('fg-root')!;
      const top = walk(root, root.getBoundingClientRect());
      const out = { skin: sk.name, width: 1200, height: Math.round(root.getBoundingClientRect().height), nodes: flatten(top ? [top] : []) };
      const pre = document.createElement('pre');
      pre.id = 'figma-dump'; pre.style.display = 'none';
      pre.textContent = JSON.stringify(out);
      document.body.appendChild(pre);
    }, 2500);
    return () => clearTimeout(id);
  }, [sk]);
  return (
    <ThemeProvider theme={{ displayFont: DISPLAY, fontFamily: FONT }} skin={sk}>
      <View nativeID="fg-root" style={{ width: 1200, backgroundColor: '#ECEAF2' }}><Sheet /></View>
    </ThemeProvider>
  );
}

export const FIGMA_SKINS = Object.keys(ALL);
