// Folder tabs (the kit's tabbed pane) and a joined segmented switch (the kit's button triple).
import React from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { darken, lighten, rgba } from './color';
import { Icon, IconName } from './Icon';
import { Label, Stripes } from './parts';
import { useLayoutSize } from './GlossButton';
import { ColorProp, useTheme, useTone } from './theme';

export type TabItem = { key: string; label?: string; icon?: IconName; content?: React.ReactNode };

/** Folder tabs that sit on top of a Panel's face: the active tab matches the face, the others are darker. */
export function Tabs({ items, value, onChange, height = 44, style }: {
  items: TabItem[]; value: string; onChange?: (key: string) => void; height?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  return (
    <View style={[{ flexDirection: 'row', gap: 6, alignItems: 'flex-end' }, style]}>
      {items.map(it => {
        const on = it.key === value;
        const face = on ? t.panel.faceTop : darken(t.panel.face, 0.12);
        return (
          <Pressable key={it.key} onPress={() => onChange?.(it.key)} style={{ flex: 1 }}>
            <View style={{
              height: on ? height : height - 6, borderTopLeftRadius: 14, borderTopRightRadius: 14,
              alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6,
              backgroundImage: `linear-gradient(180deg, ${lighten(face, 0.2)} 0%, ${face} 100%)`,
              boxShadow: `inset 0 2px 0 ${rgba('#ffffff', 0.7)}, inset 0 0 0 1.5px ${rgba(darken(t.panel.rim, 0.1), on ? 0.5 : 0.35)}`,
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
  const w = box.w / Math.max(1, items.length);
  return (
    <View onLayout={onLayout} style={[{
      flexDirection: 'row', height, borderRadius: height / 2, overflow: 'hidden',
      boxShadow: `0 3px 0 ${off.lip}, 0 5px 8px ${rgba('#000000', 0.25)}`,
    }, style]}>
      {items.map((it, i) => {
        const tn = it.key === value ? on : off;
        return (
          <Pressable key={it.key} onPress={() => onChange?.(it.key)} style={{ flex: 1 }}>
            <View style={{
              flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, overflow: 'hidden',
              backgroundImage: `linear-gradient(180deg, ${tn.top} 0%, ${tn.base} 55%, ${tn.dark} 100%)`,
              borderLeftWidth: i ? 1.5 : 0, borderLeftColor: rgba(off.lip, 0.6),
              boxShadow: `inset 0 2px 0 ${rgba('#ffffff', 0.5)}`,
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
