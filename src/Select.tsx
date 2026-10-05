// A select box: a rimmed field showing the chosen option, opening a list (optionally grouped) under it.
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { darken, rgba } from './color';
import { Icon } from './Icon';
import { Label } from './parts';
import { shadows, useSkin } from './skin';
import { Texture } from './Texture';
import { ColorProp, useTheme, useTone } from './theme';

export type SelectOption = { value: string; label: string; group?: string; badge?: string };

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  color?: ColorProp;
  width?: number;
  height?: number;
  /** Most rows shown before the list scrolls. */
  maxRows?: number;
  style?: StyleProp<ViewStyle>;
};

export function Select({ options, value, onChange, placeholder = 'Select', color, width = 200, height = 44, maxRows = 8, style }: SelectProps) {
  const t = useTheme();
  const tone = useTone(color);
  const sk = useSkin();
  const [open, setOpen] = useState(false);
  const chosen = options.find(o => o.value === value);
  const groups = Array.from(new Set(options.map(o => o.group ?? '')));
  const row = height * 0.82;
  const text = (s: string, size: number, c = t.text.dark) => (
    <Label size={size} color={c} edge={rgba('#ffffff', 0.5)} display={false} numberOfLines={1} style={{ textAlign: 'left', fontWeight: '800' }}>{s}</Label>
  );
  return (
    <View style={[{ width, zIndex: open ? 1000 : undefined }, style]}>
      <Pressable onPress={() => setOpen(o => !o)} style={{
        height, borderRadius: sk.r(height * 0.3), padding: 3, overflow: 'hidden',
        ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`, tone.base),
        boxShadow: shadows(sk.lip(3, tone.lip), sk.drop(4, 6, 0.25), sk.line(0, '')),
      }}>
        <Texture name={sk.skin.texture} />
        <View style={{
          flex: 1, borderRadius: sk.r(height * 0.24), flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 4, gap: 6,
          backgroundColor: t.panel.faceTop, boxShadow: shadows(sk.well(2, 4, tone.lip, 0.3)),
        }}>
          <View style={{ flex: 1 }}>{text(chosen?.label ?? placeholder, height * 0.36, chosen ? t.text.dark : rgba(t.text.dark, 0.45))}</View>
          {chosen?.badge ? <Badge text={chosen.badge} /> : null}
          <View style={{
            width: height - 12, height: height - 12, borderRadius: sk.r((height - 12) / 2), alignItems: 'center', justifyContent: 'center',
            ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`, tone.base),
            transform: [{ rotate: open ? '180deg' : '0deg' }],
          }}>
            <Icon name="down" size={height * 0.5} shade={rgba(tone.lip, 0.8)} />
          </View>
        </View>
      </Pressable>
      {open ? (
        <View style={{
          position: 'absolute', top: height + 8, left: 0, right: 0, borderRadius: sk.r(16), padding: 4, overflow: 'hidden',
          ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`, tone.base),
          boxShadow: shadows(sk.lip(4, tone.lip), sk.drop(10, 18, 0.4), sk.line(0, '')),
        }}>
          <Texture name={sk.skin.texture} />
          <ScrollView style={{ maxHeight: row * maxRows + groups.length * 22, borderRadius: sk.r(12), backgroundColor: t.panel.faceTop }}
            contentContainerStyle={{ padding: 4 }}>
            {groups.map(g => (
              <View key={g}>
                {g ? <View style={{ paddingHorizontal: 10, paddingTop: 6, paddingBottom: 2 }}>{text(g.toUpperCase(), 11, darken(t.panel.face, 0.4))}</View> : null}
                {options.filter(o => (o.group ?? '') === g).map(o => {
                  const on = o.value === value;
                  return (
                    <Pressable key={o.value} onPress={() => { onChange?.(o.value); setOpen(false); }} style={({ hovered }: any) => ({
                      height: row, borderRadius: sk.r(10), paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 8,
                      backgroundColor: on ? tone.base : hovered ? rgba(tone.base, 0.15) : 'transparent',
                    })}>
                      <View style={{ flex: 1 }}>{on ? <Label size={height * 0.34} edge={tone.lip} numberOfLines={1} style={{ textAlign: 'left' }}>{o.label}</Label> : text(o.label, height * 0.34)}</View>
                      {o.badge ? <Badge text={o.badge} /> : null}
                      {on ? <Icon name="check" size={height * 0.42} shade={rgba(tone.lip, 0.8)} /> : null}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

/** The small tag on an option (e.g. PRO). */
function Badge({ text }: { text: string }) {
  const tone = useTone('purple');
  const sk = useSkin();
  return (
    <View style={{ paddingHorizontal: 6, height: 18, borderRadius: sk.r(9), justifyContent: 'center', backgroundColor: tone.base }}>
      <Label size={10} edge={tone.lip}>{text}</Label>
    </View>
  );
}
