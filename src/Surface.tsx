// The raised, pressable body every button is drawn with: a lip under a face, plus stripes and a gloss pill.
// It takes its material from the current skin, so buttons never draw their own gradients or shadows.
import React from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { rgba, Tone } from './color';
import { Gloss, Stripes } from './parts';
import { shadows, useSkin } from './skin';
import { Texture } from './Texture';

export type SurfaceProps = {
  tone: Tone;
  /** Face height; the surface is height + lip tall. */
  height: number;
  /** Face width; by default it fills the parent. */
  width?: number;
  radius: number;
  /** Lip depth before the skin scales it. */
  lip: number;
  pressed?: boolean;
  /** 'linear' for pills and bars, 'radial' for balls. */
  shape?: 'linear' | 'radial';
  /** Drop shadow under the lip: [y, blur] (× lip). */
  drop?: [number, number];
  /** Inset top highlight [y, alpha], bottom shade [y, alpha] and rim line [width, alpha]. */
  shine?: [number, number];
  shade?: [number, number];
  line?: [number, number];
  stripes?: { color: string; band?: number } | false;
  gloss?: { inset: number; top: number; height: number; radius: number; strength: number; end?: number } | false;
  faceStyle?: StyleProp<ViewStyle>;
  onFaceLayout?: (e: LayoutChangeEvent) => void;
  /** Stripes need the face width; pass it once it is known. */
  faceWidth?: number;
  children?: React.ReactNode;
};

export function Surface({
  tone, height: H, width, radius, lip: lip0, pressed, shape = 'linear', drop = [0.6, 1.2], shine = [0, 0], shade = [0, 0],
  line = [0, 0], stripes, gloss, faceStyle, onFaceLayout, faceWidth, children,
}: SurfaceProps) {
  const sk = useSkin();
  const lip = sk.lipH(lip0);
  const r = sk.r(radius);
  const fill = shape === 'radial'
    ? `radial-gradient(circle at 50% 30%, ${tone.top} 0%, ${tone.base} 55%, ${tone.dark} 100%)`
    : `linear-gradient(180deg, ${tone.top} 0%, ${tone.base} 48%, ${tone.dark} 100%)`;
  const w = width ?? faceWidth ?? 0;
  const skew = shape === 'linear' ? sk.skin.skew ?? 0 : 0;
  return (
    <View style={{ flex: 1, transform: skew ? [{ skewX: `${-skew}deg` }] : undefined }}>
      {/* lip + drop shadow */}
      <View style={{
        position: 'absolute', left: 0, right: width == null ? 0 : undefined, width, top: lip, height: H, borderRadius: r,
        backgroundColor: tone.lip, boxShadow: shadows(sk.drop(lip0 * drop[0], lip0 * drop[1], 0.32), sk.line(0, '')), opacity: pressed ? 0 : 1,
      }} />
      {/* face */}
      <View onLayout={onFaceLayout} style={[{
        position: 'absolute', left: 0, right: width == null ? 0 : undefined, width, top: pressed ? lip : 0, height: H, borderRadius: r, overflow: 'hidden',
        ...sk.paint(fill, tone.base),
        boxShadow: shadows(sk.shine(shine[0], shine[1]), sk.shade(shade[0], tone.lip, shade[1]), sk.line(line[0], rgba(tone.lip, line[1]))),
      }, faceStyle]}>
        {stripes && w > 0 ? <Stripes width={w} height={H} color={stripes.color} band={stripes.band} /> : null}
        <Texture name={sk.skin.texture} />
        {gloss ? <Gloss {...gloss} radius={sk.r(gloss.radius)} /> : null}
        {skew ? <View style={{ flex: 1, transform: [{ skewX: `${skew}deg` }] }}>{children}</View> : children}
      </View>
    </View>
  );
}
