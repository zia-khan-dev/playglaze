// Game parts in the kit's style: stars, level slots, the coin pill and shop tiles.
import React from 'react';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { darken, lighten, rgba } from './color';
import { GlossButton } from './GlossButton';
import { Icon, ICONS } from './Icon';
import { Label } from './parts';
import { RoundButton } from './RoundButton';
import { ColorProp, useTheme, useTone } from './theme';
import { shadows, useSkin } from './skin';

const STAR = 'M12 1.6l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 17.8l-6.4 3.5 1.4-7.2-5.3-5 7.2-.9z';

/** A chunky star: gold when on, gray when off. */
export function Star({ on = true, size = 28, color = '#FFC21A' }: { on?: boolean; size?: number; color?: string }) {
  const c = on ? color : '#A9AEB6';
  const id = `pgStar${on ? 1 : 0}${c.replace('#', '')}`;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={lighten(c, 0.45)} />
          <Stop offset="0.55" stopColor={c} />
          <Stop offset="1" stopColor={darken(c, 0.15)} />
        </LinearGradient>
      </Defs>
      <Path d={STAR} fill={darken(c, 0.45)} transform="translate(0 1.2)" />
      <Path d={STAR} fill={`url(#${id})`} stroke={darken(c, 0.35)} strokeWidth={1.1} strokeLinejoin="round" />
      <Path d="M12 4.6l2 4.3 4.4.6-1.6 1.5" stroke="rgba(255,255,255,0.65)" strokeWidth={1.1} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

/** Three stars in an arch, the middle one raised (as on the kit's level slots). */
export function Stars({ count, of = 3, size = 22, gap = -2 }: { count: number; of?: number; size?: number; gap?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap }}>
      {Array.from({ length: of }, (_, i) => {
        const mid = of === 3 && i === 1;
        return <View key={i} style={{ marginBottom: mid ? size * 0.25 : 0 }}><Star on={i < count} size={mid ? size * 1.15 : size} /></View>;
      })}
    </View>
  );
}

export type LevelSlotProps = Omit<PressableProps, 'style' | 'children'> & {
  level: number;
  stars?: number;
  state?: 'open' | 'done' | 'locked' | 'current';
  size?: number;
  color?: ColorProp;
  style?: StyleProp<ViewStyle>;
};

/** A level tile: cream with a number and stars, a green tick when done, gray with a lock when locked. */
export function LevelSlot({ level, stars = 0, state = 'open', size = 88, color, style, ...press }: LevelSlotProps) {
  const t = useTheme();
  const tone = useTone(color ?? t.slot.rim);
  const locked = state === 'locked';
  const rim = locked ? '#C9C2B4' : tone.base;
  const sk = useSkin();
  const r = sk.r(size * 0.24);
  return (
    <Pressable disabled={locked} {...press} style={[{ width: size, height: size * 1.06 }, style]}>
      {({ pressed }) => (
        <View style={{ flex: 1, transform: [{ scale: pressed ? 0.95 : 1 }] }}>
          <View style={{
            width: size, height: size, borderRadius: r, padding: size * 0.06,
            ...sk.paint(`linear-gradient(180deg, ${lighten(rim, 0.25)} 0%, ${rim} 100%)`, rim),
            boxShadow: shadows(sk.lip(size * 0.05, darken(rim, 0.3)), sk.drop(size * 0.08, size * 0.1, 0.25), sk.line(0, ''), state === 'current' && `0 0 0 3px ${rgba('#ffffff', 0.9)}`),
          }}>
            <View style={{
              flex: 1, borderRadius: r * 0.75, alignItems: 'center', justifyContent: 'center',
              ...(locked
                ? sk.paint('linear-gradient(180deg, #F3EFE6 0%, #E2DBCC 100%)', '#E9E3D6')
                : sk.paint(`linear-gradient(180deg, ${t.panel.faceTop} 0%, ${t.slot.face} 100%)`, t.slot.face)),
              boxShadow: shadows(sk.well(2, 4, darken(rim, 0.4), 0.3), sk.line(0, '')),
            }}>
              {locked ? (
                <View style={{
                  width: size * 0.48, height: size * 0.48, borderRadius: size, alignItems: 'center', justifyContent: 'center',
                  backgroundImage: 'radial-gradient(circle at 50% 30%, #8A8A8A 0%, #5A5A5A 70%, #444 100%)',
                  boxShadow: `0 2px 0 #333, inset 0 1px 0 ${rgba('#ffffff', 0.35)}`,
                }}>
                  <Icon name="lock" size={size * 0.26} color="#2E2E2E" shade={rgba('#ffffff', 0.25)} />
                </View>
              ) : (
                <>
                  <Label size={size * 0.34} color={t.text.dark} edge={rgba('#ffffff', 0.7)} textRole="number">{level}</Label>
                  <View style={{ marginTop: size * 0.04 }}><Stars count={stars} size={size * 0.2} /></View>
                </>
              )}
            </View>
          </View>
          {state === 'done' ? (
            <View style={{
              position: 'absolute', right: -size * 0.06, top: -size * 0.06, width: size * 0.3, height: size * 0.3, borderRadius: size,
              backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 3px ${rgba('#000000', 0.3)}`,
            }}>
              <Svg width={size * 0.22} height={size * 0.22} viewBox="0 0 24 24"><Path d={ICONS.check} fill="#3DBA1E" /></Svg>
            </View>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

/** A currency counter: a dark pill with an icon on the left and a small + button on the right. */
export function CounterPill({ value, icon, onAdd, width = 130, style }: {
  value: number | string; icon?: React.ReactNode; onAdd?: () => void; width?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const h = 34;
  const sk = useSkin();
  return (
    <View style={[{ width, height: h + 8, justifyContent: 'center' }, style]}>
      <View style={{
        height: h, borderRadius: sk.r(h / 2), backgroundColor: rgba(t.groove, 0.92), paddingLeft: h + 2, paddingRight: onAdd ? h : 10,
        justifyContent: 'center', boxShadow: shadows(sk.well(2, 3, '#000000', 0.5), sk.glint(1, 0.3), sk.line(0, '')),
      }}>
        <Label size={17} edge={rgba('#000000', 0.45)} textRole="number">{value}</Label>
      </View>
      {icon ? <View style={{ position: 'absolute', left: -4, top: 0 }}>{icon}</View> : null}
      {onAdd ? <RoundButton icon="plus" size={h - 2} color="green" onPress={onAdd} style={{ position: 'absolute', right: 0, top: 2 }} /> : null}
    </View>
  );
}

/** A shiny coin for counters and prices. */
export function Coin({ size = 40, color = '#FFC21A' }: { size?: number; color?: string }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size, padding: size * 0.1,
      backgroundImage: `linear-gradient(180deg, ${lighten(color, 0.2)} 0%, ${darken(color, 0.25)} 100%)`,
      boxShadow: `0 ${size * 0.06}px 0 ${darken(color, 0.45)}, 0 ${size * 0.1}px ${size * 0.12}px ${rgba('#000000', 0.3)}`,
    }}>
      <View style={{
        flex: 1, borderRadius: size, alignItems: 'center', justifyContent: 'center',
        backgroundImage: `radial-gradient(circle at 40% 30%, ${lighten(color, 0.55)} 0%, ${color} 55%, ${darken(color, 0.1)} 100%)`,
        boxShadow: `inset 0 -1px 0 ${darken(color, 0.3)}`,
      }}>
        <Svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
          <Path d={STAR} fill={darken(color, 0.28)} />
        </Svg>
      </View>
    </View>
  );
}

/** A shop slot: a cream card with your item on it and a buy button with the price. */
export function ShopTile({ children, price, priceIcon, onBuy, color = 'purple', width = 104, badge, style }: {
  children?: React.ReactNode; price: string | number; priceIcon?: React.ReactNode; onBuy?: () => void;
  color?: ColorProp; width?: number; badge?: React.ReactNode; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const rim = darken(t.panel.rim, 0.05);
  const sk = useSkin();
  return (
    <View style={[{ width, alignItems: 'center' }, style]}>
      <View style={{
        width, height: width * 1.12, borderRadius: sk.r(width * 0.16), padding: 4,
        ...sk.paint(`linear-gradient(180deg, ${lighten(rim, 0.15)} 0%, ${rim} 100%)`, rim),
        boxShadow: shadows(sk.lip(4, darken(rim, 0.3)), sk.drop(6, 10, 0.25), sk.line(0, '')),
      }}>
        <View style={{
          flex: 1, borderRadius: sk.r(width * 0.13), alignItems: 'center', justifyContent: 'center', paddingBottom: 18,
          ...sk.paint(`radial-gradient(circle at 50% 40%, #FFFFFF 0%, ${t.panel.faceTop} 50%, ${t.slot.face} 100%)`, t.panel.faceTop),
        }}>
          {children}
        </View>
      </View>
      <GlossButton size="sm" color={color} width={width * 0.86} onPress={onBuy} style={{ marginTop: -24 }}>
        {priceIcon}
        <Label size={15} textRole="number">{price}</Label>
      </GlossButton>
      {badge ? <View style={{ position: 'absolute', top: -8, right: -6 }}>{badge}</View> : null}
    </View>
  );
}
