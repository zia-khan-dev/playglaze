// The kit's title plate: a scalloped cookie bar with a cream-yellow filling peeking out under it.
import React, { useId } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { darken, lighten } from './color';
import { Label } from './parts';
import { useTheme } from './theme';

/** A rectangle with round bumps along every edge, drawn clockwise. */
export function scallopPath(x: number, y: number, w: number, h: number, bump: number) {
  const nx = Math.max(2, Math.round(w / (bump * 2)));
  const ny = Math.max(1, Math.round(h / (bump * 2)));
  const sx = w / nx, sy = h / ny;
  const rx = sx / 2, ry = sy / 2, b = bump * 0.75;
  let d = `M ${x} ${y}`;
  for (let i = 1; i <= nx; i++) d += ` A ${rx} ${b} 0 0 1 ${x + i * sx} ${y}`;
  for (let i = 1; i <= ny; i++) d += ` A ${b} ${ry} 0 0 1 ${x + w} ${y + i * sy}`;
  for (let i = 1; i <= nx; i++) d += ` A ${rx} ${b} 0 0 1 ${x + w - i * sx} ${y + h}`;
  for (let i = 1; i <= ny; i++) d += ` A ${b} ${ry} 0 0 1 ${x} ${y + h - i * sy}`;
  return d + ' Z';
}

export type RibbonProps = {
  width: number;
  height?: number;
  title?: string;
  children?: React.ReactNode;
  /** Cookie color (default: the theme's). */
  color?: string;
  filling?: string;
  /** Tilt in degrees; the kit's titles lean a little. */
  tilt?: number;
  style?: StyleProp<ViewStyle>;
};

export function Ribbon({ width, height = 56, title, children, color, filling, tilt = -2, style }: RibbonProps) {
  const t = useTheme();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const cookie = color ?? t.ribbon.cookie;
  const fill = filling ?? t.ribbon.filling;
  const bump = height * 0.13;
  const pad = bump;
  const W = width, H = height + height * 0.12;
  const body = scallopPath(pad, pad, W - pad * 2, height - pad * 2, bump);
  return (
    <View style={[{ width: W, height: H, transform: [{ rotate: `${tilt}deg` }] }, style]}>
      <Svg width={W} height={H} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={`pgCookie${uid}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={lighten(cookie, 0.12)} />
            <Stop offset="1" stopColor={darken(cookie, 0.12)} />
          </LinearGradient>
          <LinearGradient id={`pgFill${uid}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={lighten(fill, 0.3)} />
            <Stop offset="1" stopColor={darken(fill, 0.1)} />
          </LinearGradient>
        </Defs>
        {/* shadow, filling, cookie, top shine */}
        <Path d={body} fill="rgba(0,0,0,0.28)" transform={`translate(0 ${height * 0.17})`} />
        <Path d={body} fill={`url(#pgFill${uid})`} transform={`translate(${height * 0.05} ${height * 0.1})`} />
        <Path d={body} fill={`url(#pgCookie${uid})`} stroke={darken(cookie, 0.25)} strokeWidth={1.2} />
        <Rect x={pad * 2.2} y={pad * 1.5} width={W - pad * 4.4} height={(height - pad * 2) * 0.3} rx={(height - pad * 2) * 0.15}
          fill="rgba(255,255,255,0.13)" />
      </Svg>
      <View style={{ position: 'absolute', left: pad * 2, right: pad * 2, top: 0, height, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
        {title ? <Label size={height * 0.42} color="#F4FAFF" edge={darken(cookie, 0.45)}>{title}</Label> : null}
        {children}
      </View>
    </View>
  );
}
