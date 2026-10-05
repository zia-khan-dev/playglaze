// Shared drawing parts: diagonal stripes, the glossy highlight and the outlined label.
import React from 'react';
import { StyleSheet, Text, TextProps, View, ViewStyle } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { useTheme } from './theme';
import { useSkin } from './skin';

/** Soft diagonal bands across a surface (the kit's candy stripes). The parent must clip (overflow hidden). */
export function Stripes({ width, height, color = 'rgba(255,255,255,0.16)', band, gap }: {
  width: number; height: number; color?: string; band?: number; gap?: number;
}) {
  const sk = useSkin();
  if (!sk.skin.stripes) return null;
  const b = band ?? Math.max(10, height * 0.42);
  const g = gap ?? b * 1.25;
  const lean = height * 0.45;
  const polys: string[] = [];
  for (let x = -lean; x < width + lean; x += b + g) {
    polys.push(`${x + lean},0 ${x + lean + b},0 ${x + b},${height} ${x},${height}`);
  }
  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
      {polys.map((p, i) => <Polygon key={i} points={p} fill={color} />)}
    </Svg>
  );
}

/** The white glossy pill along the top of a button or bar. */
export function Gloss({ inset, top, height, radius, strength = 0.55, end, style }: {
  inset: number; top: number; height: number; radius: number; strength?: number;
  /** Alpha at the bottom of the pill (default strength × 0.15). */
  end?: number; style?: ViewStyle;
}) {
  const g = useSkin().skin.gloss;
  if (!g) return null;
  const a = strength * g, b = (end ?? strength * 0.15) * g;
  return (
    <View pointerEvents="none" style={[{
      position: 'absolute', left: inset, right: inset, top, height, borderRadius: radius,
      backgroundImage: `linear-gradient(180deg, rgba(255,255,255,${a}) 0%, rgba(255,255,255,${b}) 100%)`,
    }, style]} />
  );
}

export type LabelProps = TextProps & {
  size?: number;
  color?: string;
  /** The darker color under the text (the kit's thick text edge). */
  edge?: string;
  /** Use the theme's display font (default true). */
  display?: boolean;
};

/** Bold game text: white with a thick darker edge under it. */
export function Label({ size = 20, color, edge, display = true, style, ...rest }: LabelProps) {
  const t = useTheme();
  const { skin } = useSkin();
  const outline = skin.label !== 'edge';
  const glow = skin.label === 'glow';
  const font = display ? t.displayFont ?? t.fontFamily : t.fontFamily;
  return (
    <Text
      allowFontScaling={false}
      {...rest}
      style={[{
        fontSize: size, color: color ?? t.text.color, fontFamily: font, fontWeight: font ? undefined : '900',
        textShadowColor: glow ? skin.glow ?? edge ?? t.text.shadow : edge ?? t.text.shadow, textShadowOffset: { width: 0, height: outline ? 0 : Math.max(1.5, size * 0.09) },
        textShadowRadius: glow ? Math.max(4, size * 0.35) : outline ? Math.max(1.5, size * 0.12) : Math.max(1, size * 0.06), includeFontPadding: false, textAlign: 'center',
      }, style]}
    />
  );
}
