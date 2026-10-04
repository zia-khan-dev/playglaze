// Docs building blocks: page header, demo card (live preview + code), API table.
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export const C = {
  bg: '#24232B', side: '#1D1C23', card: '#2E2D37', cardLine: '#3C3A47', preview: '#34333E',
  text: '#ECE8F5', dim: '#A9A4BB', faint: '#7E7993', accent: '#FFB648', cream: '#FFE9C2', code: '#17161C',
};
export const FONT = 'Nunito';
export const DISPLAY = 'Lilita One';
export const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const T = ({ children, size = 15, color = C.text, weight = '500', style }: {
  children: React.ReactNode; size?: number; color?: string; weight?: '500' | '700' | '800'; style?: object;
}) => <Text style={[{ fontFamily: FONT, fontSize: size, color, fontWeight: weight, lineHeight: size * 1.55 }, style]}>{children}</Text>;

export const Code = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ fontFamily: MONO, fontSize: 13, color: C.accent, backgroundColor: '#3A3846', paddingHorizontal: 5, borderRadius: 4 }}>{children}</Text>
);

export function PageHead({ title, intro, importLine }: { title: string; intro: React.ReactNode; importLine?: string }) {
  return (
    <View style={{ marginBottom: 28 }}>
      <Text style={{ fontFamily: DISPLAY, fontSize: 40, color: C.cream, marginBottom: 8 }}>{title}</Text>
      <T size={16} color={C.dim}>{intro}</T>
      {importLine ? <CodeBlock code={importLine} style={{ marginTop: 16 }} /> : null}
    </View>
  );
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return <Text nativeID={id} style={{ fontFamily: DISPLAY, fontSize: 26, color: C.cream, marginTop: 36, marginBottom: 14 }}>{children}</Text>;
}

export function CodeBlock({ code, style }: { code: string; style?: object }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try { (globalThis as any).navigator?.clipboard?.writeText(code); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <View style={[{ backgroundColor: C.code, borderRadius: 10, padding: 16, paddingRight: 64 }, style]}>
      <Text style={{ fontFamily: MONO, fontSize: 13, lineHeight: 20, color: '#E7E3F2' }}>{code}</Text>
      <Pressable onPress={copy} style={{ position: 'absolute', top: 8, right: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: '#2C2A35' }}>
        <T size={12} color={copied ? '#7EE08A' : C.dim} weight="700">{copied ? 'Copied' : 'Copy'}</T>
      </Pressable>
    </View>
  );
}

export type Demo = { title: string; desc?: React.ReactNode; code: string; render: () => React.ReactElement; light?: boolean };

/** Live preview on top, a short description, and the code (toggled), like antd's demo cards. */
export function DemoCard({ demo }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ borderWidth: 1, borderColor: C.cardLine, borderRadius: 12, overflow: 'hidden', marginBottom: 20, backgroundColor: C.card }}>
      <View style={{ padding: 24, backgroundColor: demo.light ? '#F4E9D3' : C.preview, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{demo.render()}</View>
      </View>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: C.cardLine }}>
        <T size={16} weight="800">{demo.title}</T>
        {demo.desc ? <T color={C.dim} style={{ marginTop: 2 }}>{demo.desc}</T> : null}
        <Pressable onPress={() => setOpen(o => !o)} style={{ alignSelf: 'flex-start', marginTop: 10 }}>
          <T size={13} color={C.accent} weight="800">{open ? 'Hide code ▴' : 'Show code ▾'}</T>
        </Pressable>
      </View>
      {open ? <CodeBlock code={demo.code} style={{ borderRadius: 0 }} /> : null}
    </View>
  );
}

export type Prop = [name: string, description: string, type: string, def?: string];

export function ApiTable({ title, rows }: { title?: string; rows: Prop[] }) {
  const cell = { paddingVertical: 10, paddingHorizontal: 12 } as const;
  return (
    <View style={{ marginBottom: 24 }}>
      {title ? <T size={17} weight="800" style={{ marginBottom: 8 }}>{title}</T> : null}
      <ScrollView horizontal style={{ width: '100%', maxWidth: '100%' }} contentContainerStyle={{ minWidth: '100%' }}>
      <View style={{ borderWidth: 1, borderColor: C.cardLine, borderRadius: 10, overflow: 'hidden', minWidth: 640, flex: 1 }}>
        <View style={{ flexDirection: 'row', backgroundColor: C.card }}>
          {['Property', 'Description', 'Type', 'Default'].map((h, i) => (
            <View key={h} style={[cell, { flex: [1.1, 2.4, 1.6, 0.9][i] }]}><T size={13} weight="800" color={C.dim}>{h}</T></View>
          ))}
        </View>
        {rows.map(([name, desc, type, def], i) => (
          <View key={name} style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.cardLine, backgroundColor: i % 2 ? '#292830' : 'transparent' }}>
            <View style={[cell, { flex: 1.1 }]}><Text style={{ fontFamily: MONO, fontSize: 13, color: C.accent }}>{name}</Text></View>
            <View style={[cell, { flex: 2.4 }]}><T size={14}>{desc}</T></View>
            <View style={[cell, { flex: 1.6 }]}><Text style={{ fontFamily: MONO, fontSize: 12.5, color: '#9CD3FF' }}>{type}</Text></View>
            <View style={[cell, { flex: 0.9 }]}><Text style={{ fontFamily: MONO, fontSize: 12.5, color: C.dim }}>{def ?? '—'}</Text></View>
          </View>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}

export const Row = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap, width: '100%' }}>{children}</View>
);
