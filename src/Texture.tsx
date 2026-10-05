// Surface patterns for skins: wood grain, stone blocks, carbon weave, halftone dots and more.
// Each is a small SVG tile repeated over its parent (which must clip: overflow hidden).
import React, { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Defs, Path, Pattern, Rect } from 'react-native-svg';
import type { TextureName } from './skin';

const D = 'rgba(0,0,0,';
const L = 'rgba(255,255,255,';

/** [tile width, tile height, tile content] for each texture. `k` scales the pattern's strength. */
function tile(name: TextureName, k: number): [number, number, React.ReactNode] {
  const d = (a: number) => `${D}${a * k})`;
  const l = (a: number) => `${L}${a * k})`;
  switch (name) {
    case 'wood': return [64, 14, <>
      <Path d="M0 4 C16 1 28 7 44 4 S60 2 64 4" stroke={d(0.16)} strokeWidth={1.4} fill="none" />
      <Path d="M0 10 C12 12 30 8 40 11 S58 12 64 10" stroke={d(0.1)} strokeWidth={1} fill="none" />
      <Path d="M0 7 C20 8 34 6 64 7" stroke={l(0.08)} strokeWidth={1} fill="none" />
    </>];
    case 'stone': return [48, 24, <>
      <Path d="M0 0.5 H48 M0 12.5 H48 M0.5 0 V12 M24.5 12 V24" stroke={d(0.22)} strokeWidth={1.2} />
      <Path d="M1 2 H47 M1 14 H47" stroke={l(0.12)} strokeWidth={1} />
    </>];
    case 'carbon': return [8, 8, <>
      <Rect x={0} y={0} width={4} height={4} fill={d(0.22)} />
      <Rect x={4} y={4} width={4} height={4} fill={d(0.22)} />
      <Rect x={0} y={0} width={4} height={1} fill={l(0.08)} />
      <Rect x={4} y={4} width={4} height={1} fill={l(0.08)} />
    </>];
    case 'halftone': return [8, 8, <>
      <Circle cx={2} cy={2} r={1.4} fill={d(0.16)} />
      <Circle cx={6} cy={6} r={1.4} fill={d(0.16)} />
    </>];
    case 'paper': return [24, 14, <>
      <Path d="M0 13.5 H24" stroke="rgba(70,120,200,0.18)" strokeWidth={1} opacity={k} />
    </>];
    case 'felt': return [6, 6, <>
      <Circle cx={1} cy={1} r={0.7} fill={d(0.1)} />
      <Circle cx={4} cy={3} r={0.6} fill={l(0.06)} />
      <Circle cx={2.5} cy={5} r={0.6} fill={d(0.08)} />
    </>];
    case 'metal': return [10, 10, <>
      <Path d="M0 2 H10 M0 6 H10" stroke={l(0.07)} strokeWidth={1} />
      <Path d="M0 4 H10 M0 8.5 H10" stroke={d(0.07)} strokeWidth={1} />
    </>];
    case 'scratch': return [60, 40, <>
      <Path d="M4 6 L22 14 M30 30 L52 22 M40 4 L48 12 M10 34 L18 30" stroke={l(0.12)} strokeWidth={1} />
      <Path d="M14 22 L34 18 M44 36 L58 32" stroke={d(0.2)} strokeWidth={1.2} />
    </>];
    case 'scanlines': return [4, 4, <Rect x={0} y={0} width={4} height={1.2} fill={l(0.07)} />];
    case 'pixel': return [6, 6, <>
      <Rect x={0} y={0} width={3} height={3} fill={l(0.07)} />
      <Rect x={3} y={3} width={3} height={3} fill={d(0.07)} />
    </>];
    case 'bubbles': return [40, 40, <>
      <Circle cx={10} cy={12} r={5} fill={l(0.14)} />
      <Circle cx={30} cy={28} r={3.5} fill={l(0.12)} />
      <Circle cx={28} cy={8} r={2} fill={l(0.18)} />
    </>];
    case 'sparkle': return [36, 36, <>
      <Path d="M9 4 L10.2 8 L14 9 L10.2 10 L9 14 L7.8 10 L4 9 L7.8 8 Z" fill={l(0.35)} />
      <Circle cx={27} cy={26} r={1.6} fill={l(0.4)} />
      <Circle cx={24} cy={10} r={1} fill={l(0.3)} />
    </>];
  }
}

/** A texture over its parent. strength: 1 is the default look. */
export function Texture({ name, strength = 1 }: { name?: TextureName; strength?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  if (!name) return null;
  const [w, h, body] = tile(name, strength);
  const id = `pgTex${name}${uid}`;
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <Pattern id={id} patternUnits="userSpaceOnUse" width={w} height={h}>{body}</Pattern>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}
