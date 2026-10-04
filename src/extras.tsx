// More game parts: badge, avatar, text field, progress ring, hearts, reward pop, daily reward day,
// booster slot, quest card and leaderboard row.
import React, { useEffect, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, Pressable, StyleProp, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { darken, lighten, rgba } from './color';
import { GlossButton } from './GlossButton';
import { Icon, ICONS, IconName } from './Icon';
import { Label } from './parts';
import { ProgressBar } from './controls';
import { ColorProp, useTheme, useTone } from './theme';

/** A red count bubble (or dot) on the top-right corner of anything. */
export function Badge({ count, dot, max = 99, color = 'red', children, style }: {
  count?: number; dot?: boolean; max?: number; color?: ColorProp; children?: React.ReactNode; style?: StyleProp<ViewStyle>;
}) {
  const tone = useTone(color);
  const show = dot || (count !== undefined && count > 0);
  const text = count !== undefined && count > max ? `${max}+` : `${count ?? ''}`;
  const h = dot ? 14 : 24;
  return (
    <View style={[{ alignSelf: 'flex-start' }, style]}>
      {children}
      {show ? (
        <View style={{
          position: 'absolute', top: -h * 0.35, right: -h * 0.35, minWidth: h, height: h, borderRadius: h / 2, paddingHorizontal: dot ? 0 : 6,
          alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF',
          backgroundImage: `linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`,
          boxShadow: `0 2px 3px ${rgba('#000000', 0.35)}`,
        }}>
          {dot ? null : <Label size={13} edge={tone.lip}>{text}</Label>}
        </View>
      ) : null}
    </View>
  );
}

/** A framed avatar (the kit's thick orange frame) with an optional level badge. */
export function Avatar({ source, children, size = 72, color, level, style }: {
  source?: ImageSourcePropType; children?: React.ReactNode; size?: number; color?: ColorProp; level?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const tone = useTone(color ?? t.slot.rim);
  const r = size * 0.24;
  return (
    <View style={[{ width: size, height: size + (level ? size * 0.12 : 0) }, style]}>
      <View style={{
        width: size, height: size, borderRadius: r, padding: size * 0.08,
        backgroundImage: `linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`,
        boxShadow: `0 ${size * 0.05}px 0 ${tone.lip}, 0 ${size * 0.08}px ${size * 0.1}px ${rgba('#000000', 0.3)}, inset 0 2px 0 ${rgba('#ffffff', 0.55)}`,
      }}>
        <View style={{
          flex: 1, borderRadius: r * 0.7, overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `linear-gradient(180deg, ${t.panel.faceTop} 0%, ${t.slot.face} 100%)`,
          boxShadow: `inset 0 2px 4px ${rgba(tone.lip, 0.4)}`,
        }}>
          {source ? <Image source={source} style={{ width: '100%', height: '100%' }} resizeMode="cover" /> : children ?? <Icon name="user" size={size * 0.5} color={darken(t.slot.face, 0.3)} shade={null} />}
        </View>
      </View>
      {level ? (
        <View style={{
          position: 'absolute', bottom: 0, alignSelf: 'center', minWidth: size * 0.46, height: size * 0.28, borderRadius: size,
          paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center',
          backgroundImage: `linear-gradient(180deg, ${lighten('#7C3AED', 0.2)} 0%, #6D28D9 100%)`,
          borderWidth: 2, borderColor: '#FFFFFF', boxShadow: `0 2px 3px ${rgba('#000000', 0.35)}`,
        }}>
          <Label size={size * 0.17} edge="#3B0F7A">{level}</Label>
        </View>
      ) : null}
    </View>
  );
}

/** A white text box with a colored rim (the kit's text box). */
export function TextField({ icon, color, height = 48, style, ...input }: TextInputProps & {
  icon?: IconName; color?: ColorProp; height?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const tone = useTone(color);
  return (
    <View style={[{
      height, borderRadius: height * 0.3, padding: 3, flexDirection: 'row',
      backgroundImage: `linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`,
      boxShadow: `0 2px 0 ${tone.lip}`,
    }, style]}>
      <View style={{
        flex: 1, borderRadius: height * 0.24, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 8,
        boxShadow: `inset 0 2px 4px ${rgba(tone.lip, 0.35)}`,
      }}>
        {icon ? <Icon name={icon} size={height * 0.42} color={darken(t.slot.face, 0.35)} shade={null} /> : null}
        <TextInput
          placeholderTextColor={darken(t.slot.face, 0.25)}
          {...input}
          style={{ flex: 1, height: '100%', fontSize: height * 0.36, color: t.text.dark, fontFamily: t.fontFamily, outlineStyle: 'none' } as any}
        />
      </View>
    </View>
  );
}

/** A round progress ring (timers, loading, XP), with any content in the middle. value: 0..1. */
export function ProgressRing({ value, size = 96, thickness, color, groove, children }: {
  value: number; size?: number; thickness?: number; color?: ColorProp; groove?: string; children?: React.ReactNode;
}) {
  const t = useTheme();
  const tone = useTone(color);
  const th = thickness ?? size * 0.14;
  const r = (size - th) / 2 - 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  const id = `pgRing${tone.base.slice(1)}`;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={tone.top} /><Stop offset="1" stopColor={tone.dark} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={groove ?? t.groove} strokeWidth={th} fill="none" opacity={0.85} />
        <Circle cx={size / 2} cy={size / 2 + 1.5} r={r} stroke={tone.lip} strokeWidth={th * 0.9} fill="none"
          strokeDasharray={`${c * v} ${c}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2 + 1.5})`} />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={`url(#${id})`} strokeWidth={th * 0.9} fill="none"
          strokeDasharray={`${c * v} ${c}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </Svg>
      {children}
    </View>
  );
}

/** A row of hearts for lives: full ones red, empty ones gray. */
export function Hearts({ count, max = 5, size = 28, gap = 2 }: { count: number; max?: number; size?: number; gap?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap }}>
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} name="heart" size={size} color={i < count ? '#F5332B' : '#B9B4AA'} shade={i < count ? '#8F1414' : 'rgba(0,0,0,0.25)'} />
      ))}
    </View>
  );
}

/** "+50" style text that jumps up and fades. Change its key to play it again. */
export function RewardPop({ children, rise = 46, duration = 900, delay = 0 }: {
  children: React.ReactNode; rise?: number; duration?: number; delay?: number;
}) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    a.setValue(0);
    Animated.timing(a, { toValue: 1, duration, delay, useNativeDriver: true }).start();
  }, [a, duration, delay]);
  return (
    <Animated.View pointerEvents="none" style={{
      flexDirection: 'row', alignItems: 'center', gap: 4,
      opacity: a.interpolate({ inputRange: [0, 0.15, 0.7, 1], outputRange: [0, 1, 1, 0] }),
      transform: [
        { translateY: a.interpolate({ inputRange: [0, 1], outputRange: [0, -rise] }) },
        { scale: a.interpolate({ inputRange: [0, 0.2, 0.35, 1], outputRange: [0.4, 1.25, 1, 1] }) },
      ],
    }}>{children}</Animated.View>
  );
}

const CHECK = ICONS.check;

/** One day of a daily reward calendar. */
export function DailyRewardDay({ day, children, amount, state = 'open', width = 84, big, onPress, style }: {
  day: number; children?: React.ReactNode; amount?: string | number; state?: 'claimed' | 'today' | 'open' | 'locked';
  width?: number; big?: boolean; onPress?: () => void; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const today = state === 'today';
  const tone = useTone(today ? 'green' : big ? 'purple' : t.slot.rim);
  const w = big ? width * 2 + 10 : width;
  const h = width * 1.2;
  return (
    <Pressable disabled={!onPress} onPress={onPress} style={[{ width: w, height: h }, style]}>
      <View style={{
        flex: 1, borderRadius: 16, padding: 4, opacity: state === 'locked' ? 0.6 : 1,
        backgroundImage: `linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`,
        boxShadow: `0 4px 0 ${tone.lip}, 0 6px 10px ${rgba('#000000', 0.25)}${today ? `, 0 0 0 3px ${rgba('#ffffff', 0.9)}` : ''}`,
      }}>
        <View style={{ height: 22, alignItems: 'center', justifyContent: 'center' }}>
          <Label size={15} edge={tone.lip}>{day}</Label>
        </View>
        <View style={{
          flex: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 2,
          backgroundImage: `radial-gradient(circle at 50% 40%, #FFFFFF 0%, ${t.panel.faceTop} 55%, ${t.slot.face} 100%)`,
        }}>
          {children}
          {amount !== undefined ? <Label size={15} color={t.text.dark} edge={rgba('#ffffff', 0.7)}>{amount}</Label> : null}
        </View>
      </View>
      {state === 'claimed' ? (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: 16, backgroundColor: rgba('#000000', 0.32), alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#3DBA1E', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' }}>
            <Svg width={26} height={26} viewBox="0 0 24 24"><Path d={CHECK} fill="#FFFFFF" /></Svg>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

/** A round cream holder for a booster, with a count (or a green + when empty) and a selected ring. */
export function BoosterSlot({ children, icon, count = 0, selected, size = 64, onPress, style }: {
  children?: React.ReactNode; icon?: IconName; count?: number; selected?: boolean; size?: number; onPress?: () => void; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const rim = t.panel.rim;
  return (
    <Pressable onPress={onPress} style={[{ width: size, height: size }, style]}>
      {({ pressed }) => (
        <View style={{ flex: 1, transform: [{ scale: pressed ? 0.92 : 1 }] }}>
          <View style={{
            flex: 1, borderRadius: size, padding: size * 0.07,
            backgroundImage: `linear-gradient(180deg, ${lighten(rim, 0.2)} 0%, ${darken(rim, 0.1)} 100%)`,
            boxShadow: `0 3px 0 ${darken(rim, 0.35)}, 0 5px 8px ${rgba('#000000', 0.3)}${selected ? `, 0 0 0 3px #FFFFFF, 0 0 14px 4px ${rgba('#FFE066', 0.9)}` : ''}`,
          }}>
            <View style={{
              flex: 1, borderRadius: size, alignItems: 'center', justifyContent: 'center',
              backgroundImage: `radial-gradient(circle at 50% 35%, #FFFFFF 0%, ${t.panel.faceTop} 50%, ${t.slot.face} 100%)`,
              boxShadow: `inset 0 3px 5px ${rgba(darken(rim, 0.4), 0.35)}`,
            }}>
              {icon ? <Icon name={icon} size={size * 0.5} color={darken(rim, 0.15)} shade={rgba(darken(rim, 0.5), 0.5)} /> : children}
            </View>
          </View>
          <View style={{
            position: 'absolute', right: -size * 0.04, bottom: -size * 0.04, minWidth: size * 0.36, height: size * 0.36, borderRadius: size,
            alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, borderWidth: 2, borderColor: '#FFFFFF',
            backgroundImage: count > 0 ? 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)' : 'linear-gradient(180deg, #7EDC4A 0%, #3E9E12 100%)',
            boxShadow: `0 2px 3px ${rgba('#000000', 0.35)}`,
          }}>
            {count > 0 ? <Label size={size * 0.2} edge="#4C0F80">{count}</Label> : <Icon name="plus" size={size * 0.24} shade="#25660A" />}
          </View>
        </View>
      )}
    </Pressable>
  );
}

/** A quest / mission row: title, a striped progress bar with "3/5", and a claim button when done. */
export function QuestCard({ title, progress, total, reward, onClaim, color, style }: {
  title: string; progress: number; total: number; reward?: React.ReactNode; onClaim?: () => void; color?: ColorProp; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const done = progress >= total;
  return (
    <View style={[{
      borderRadius: 16, padding: 12, gap: 8,
      backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, ${t.panel.faceTop} 100%)`,
      boxShadow: `0 3px 0 ${darken(t.panel.face, 0.18)}, inset 0 0 0 1.5px ${rgba(darken(t.panel.face, 0.15), 0.8)}`,
    }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Label size={17} color={t.text.dark} edge={rgba('#ffffff', 0.7)} style={{ flex: 1, textAlign: 'left' }} numberOfLines={1}>{title}</Label>
        {reward}
        <View style={{ width: 92 }}>
          <GlossButton size="xs" color={done ? 'green' : color} disabled={!done && !onClaim} onPress={onClaim}>
            {done ? <Icon name="check" size={20} /> : <Icon name="play" size={18} />}
          </GlossButton>
        </View>
      </View>
      <ProgressBar value={progress / total} color={done ? 'green' : color} height={20} groove={darken(t.slot.face, 0.08)}>
        <Label size={13} edge={rgba('#000000', 0.45)}>{Math.min(progress, total)}/{total}</Label>
      </ProgressBar>
    </View>
  );
}

const MEDAL = ['#FFC21A', '#C7CED6', '#E0904A'];

/** One leaderboard line: rank (gold, silver, bronze for the top 3), avatar, name, score. `me` highlights it. */
export function LeaderboardRow({ rank, name, subtitle, score, avatar, me, style }: {
  rank: number; name: string; subtitle?: string; score: number | string; avatar?: React.ReactNode; me?: boolean; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const medal = MEDAL[rank - 1];
  return (
    <View style={[{
      flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 16, paddingVertical: 8, paddingHorizontal: 10,
      backgroundImage: me ? 'linear-gradient(180deg, #FFF3C4 0%, #FFE08A 100%)' : `linear-gradient(180deg, #FFFFFF 0%, ${t.panel.faceTop} 100%)`,
      boxShadow: `0 3px 0 ${darken(t.panel.face, 0.18)}, inset 0 0 0 ${me ? 2 : 1.5}px ${me ? '#F5A70C' : rgba(darken(t.panel.face, 0.15), 0.8)}`,
    }, style]}>
      <View style={{
        width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
        backgroundImage: medal ? `linear-gradient(180deg, ${lighten(medal, 0.35)} 0%, ${darken(medal, 0.1)} 100%)` : undefined,
        backgroundColor: medal ? undefined : darken(t.panel.face, 0.08),
        boxShadow: medal ? `0 2px 0 ${darken(medal, 0.4)}` : undefined,
      }}>
        <Label size={16} color={medal ? '#FFFFFF' : t.text.dark} edge={medal ? darken(medal, 0.45) : rgba('#ffffff', 0.6)}>{rank}</Label>
      </View>
      {avatar ?? <Avatar size={44} />}
      <View style={{ flex: 1 }}>
        <Label size={16} color={t.text.dark} edge={rgba('#ffffff', 0.7)} style={{ textAlign: 'left' }} numberOfLines={1}>{name}</Label>
        {subtitle ? <Label size={12} display={false} color={darken(t.panel.face, 0.45)} edge="transparent" style={{ textAlign: 'left' }}>{subtitle}</Label> : null}
      </View>
      <Label size={18} color={t.text.dark} edge={rgba('#ffffff', 0.7)}>{score}</Label>
    </View>
  );
}
