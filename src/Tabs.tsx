// Folder tabs (the kit's tabbed pane) and a joined segmented switch (the kit's button triple).
import React from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { darken, lighten, rgba } from './color';
import { Icon, IconName } from './Icon';
import { Label, Stripes } from './parts';
import { useLayoutSize } from './GlossButton';
import { ColorProp, useTheme, useTone } from './theme';
import { shadows, useSkin } from './skin';

export type TabItem = { key: string; label?: string; icon?: IconName; content?: React.ReactNode };

/** Folder tabs that sit on top of a Panel's face: the active tab matches the face, the others are darker. */
export function Tabs({ items, value, onChange, height = 44, style }: {
  items: TabItem[]; value: string; onChange?: (key: string) => void; height?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const sk = useSkin();
  return (
    <View style={[{ flexDirection: 'row', gap: 6, alignItems: 'flex-end' }, style]}>
      {items.map(it => {
        const on = it.key === value;
        const face = on ? t.panel.faceTop : darken(t.panel.face, 0.12);
        return (
          <Pressable key={it.key} onPress={() => onChange?.(it.key)} style={{ flex: 1 }}>
            <View style={{
              height: on ? height : height - 6, borderTopLeftRadius: sk.r(14), borderTopRightRadius: sk.r(14),
              alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6,
              ...sk.paint(`linear-gradient(180deg, ${lighten(face, 0.2)} 0%, ${face} 100%)`, face),
              boxShadow: shadows(sk.shine(2, 0.7), sk.line(1.5, rgba(darken(t.panel.rim, 0.1), on ? 0.5 : 0.35))),
            }}>
              {it.icon ? <Icon name={it.icon} size={height * 0.45} color={on ? t.text.dark : darken(t.panel.face, 0.45)} shade={null} /> : null}
              {it.label ? <Label size={height * 0.36} color={on ? t.text.dark : darken(t.panel.face, 0.45)} edge={rgba('#ffffff', 0.6)}>{it.label}</Label> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/** A joined row of options: the chosen one is glossy and colored, the others gray. */
export function Segmented({ items, value, onChange, color, height = 40, style }: {
  items: TabItem[]; value: string; onChange?: (key: string) => void; color?: ColorProp; height?: number; style?: StyleProp<ViewStyle>;
}) {
  const on = useTone(color);
  const off = useTone('gray');
  const [box, onLayout] = useLayoutSize();
  const sk = useSkin();
  const w = box.w / Math.max(1, items.length);
  return (
    <View onLayout={onLayout} style={[{
      flexDirection: 'row', height, borderRadius: sk.r(height / 2), overflow: 'hidden',
      boxShadow: shadows(sk.lip(3, off.lip), sk.drop(5, 8, 0.25), sk.line(0, '')),
    }, style]}>
      {items.map((it, i) => {
        const tn = it.key === value ? on : off;
        return (
          <Pressable key={it.key} onPress={() => onChange?.(it.key)} style={{ flex: 1 }}>
            <View style={{
              flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, overflow: 'hidden',
              ...sk.paint(`linear-gradient(180deg, ${tn.top} 0%, ${tn.base} 55%, ${tn.dark} 100%)`, tn.base),
              borderLeftWidth: i ? 1.5 + sk.skin.outline : 0, borderLeftColor: sk.skin.outline ? sk.skin.ink : rgba(off.lip, 0.6),
              boxShadow: shadows(sk.shine(2, 0.5)),
            }}>
              {w > 0 ? <Stripes width={w} height={height} color={rgba('#ffffff', 0.1)} /> : null}
              {it.icon ? <Icon name={it.icon} size={height * 0.5} shade={rgba(tn.lip, 0.8)} /> : null}
              {it.label ? <Label size={height * 0.36} edge={tn.lip}>{it.label}</Label> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
