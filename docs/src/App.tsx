// The docs shell: top bar, sidebar menu by group, and one page per component (hash routes: #/gloss-button).
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { bright, Ribbon, ThemeProvider } from '../../src';
import { PAGES, PageView } from './pages';
import { C, DISPLAY, FONT, T } from './ui';

const theme = { ...bright, displayFont: DISPLAY, fontFamily: FONT };
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
                backgroundColor: on ? 'rgba(255,182,72,0.12)' : hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
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

export default function App() {
  const { width } = useWindowDimensions();
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
    <ThemeProvider theme={theme}>
      <View style={{ height: '100vh' as any, backgroundColor: C.bg, overflow: 'hidden' }}>
        {/* top bar */}
        <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#34323F', backgroundColor: C.side, gap: 12 }}>
          {!wide ? (
            <Pressable onPress={() => setMenuOpen(o => !o)} style={{ padding: 8 }}><Text style={{ color: C.text, fontSize: 22 }}>☰</Text></Pressable>
          ) : null}
          <Pressable onPress={() => go('introduction')}><Ribbon width={150} height={42} title="PlayGlaze" tilt={-2} /></Pressable>
          {wide ? <T size={13} color={C.faint} weight="700">v0.1.0</T> : null}
          <View style={{ flex: 1 }} />
          <Pressable onPress={() => go('installation')}><T weight="800" color={C.dim}>Docs</T></Pressable>
          <Pressable onPress={() => (globalThis as any).open?.('https://github.com/zia-khan-dev/playglaze', '_blank')}><T weight="800" color={C.dim}>GitHub</T></Pressable>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          {wide ? (
            <ScrollView style={{ width: 250, flexGrow: 0, backgroundColor: C.side, borderRightWidth: 1, borderRightColor: '#34323F' }}>
              <Menu current={slug} go={go} />
            </ScrollView>
          ) : null}
          <ScrollView ref={scroll} style={{ flex: 1, minWidth: 0 }} contentContainerStyle={{ alignItems: 'center', padding: wide ? 40 : 16, paddingBottom: 80 }}>
            <View style={{ width: '100%', maxWidth: 960, minWidth: 0 }}>
              <PageView key={slug} page={page} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, borderTopWidth: 1, borderTopColor: '#34323F', paddingTop: 20 }}>
                {prev ? <Pressable onPress={() => go(prev.slug)}><T color={C.faint} size={13}>Previous</T><T weight="800" color={C.accent}>← {prev.name}</T></Pressable> : <View />}
                {next ? <Pressable onPress={() => go(next.slug)} style={{ alignItems: 'flex-end' }}><T color={C.faint} size={13}>Next</T><T weight="800" color={C.accent}>{next.name} →</T></Pressable> : <View />}
              </View>
            </View>
          </ScrollView>
        </View>

        {!wide && menuOpen ? (
          <View style={{ position: 'absolute', top: 64, left: 0, bottom: 0, width: 260, backgroundColor: C.side, borderRightWidth: 1, borderRightColor: '#34323F', boxShadow: '8px 0 24px rgba(0,0,0,0.5)' }}>
            <ScrollView><Menu current={slug} go={go} /></ScrollView>
          </View>
        ) : null}
      </View>
    </ThemeProvider>
  );
}
