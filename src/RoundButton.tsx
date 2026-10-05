// Round glossy icon buttons (settings, shop, profile) and the kit's brown-ringed close button.
import React from 'react';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { rgba } from './color';
import { Icon, IconName } from './Icon';
import { shadows, useSkin } from './skin';
import { Surface } from './Surface';
import { ColorProp, useTheme, useTone } from './theme';

export type RoundButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  icon?: IconName;
  children?: React.ReactNode;
  color?: ColorProp;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function RoundButton({ icon, children, color, size = 64, disabled, style, ...press }: RoundButtonProps) {
  const tone = useTone(disabled ? 'gray' : color);
  const lip = Math.round(size * 0.07);
  const sk = useSkin();
  return (
    <Pressable disabled={disabled} {...press} style={[{ width: size, height: size + sk.lipH(lip) }, style]}>
      {({ pressed }) => (
        <Surface
          tone={tone} width={size} height={size} radius={size / 2} lip={lip} pressed={pressed} shape="radial" drop={[1, 1.6]}
          shine={[size * 0.04, 0.65]} shade={[size * 0.05, 0.5]} line={[1, 0.55]}
          stripes={{ color: rgba('#ffffff', 0.12), band: size * 0.2 }}
          gloss={{ inset: size * 0.16, top: size * 0.07, height: size * 0.36, radius: size, strength: 0.5, end: 0.04 }}
          faceStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
          {icon ? <Icon name={icon} size={size * 0.52} shade={rgba(tone.lip, 0.85)} /> : children}
        </Surface>
      )}
    </Pressable>
  );
}

/** The kit's close button: a brown ring around a glossy orange ball with a white ×. */
export function CloseButton({ size = 40, color, style, ...press }: Omit<RoundButtonProps, 'icon' | 'children'>) {
  const t = useTheme();
  const tone = useTone(color);
  const ring = size * 0.12;
  const sk = useSkin();
  return (
    <Pressable hitSlop={8} {...press} style={[{ width: size, height: size }, style]}>
      {({ pressed }) => (
        <View style={{
          width: size, height: size, borderRadius: size / 2, padding: ring, transform: [{ scale: pressed ? 0.92 : 1 }],
          backgroundColor: t.ribbon.cookie,
          boxShadow: shadows(sk.drop(size * 0.08, size * 0.14, 0.4), sk.shine(1, 0.35), sk.line(0, '')),
        }}>
          <View style={{
            flex: 1, borderRadius: size, alignItems: 'center', justifyContent: 'center',
            ...sk.paint(`radial-gradient(circle at 50% 30%, ${tone.light} 0%, ${tone.base} 60%, ${tone.dark} 100%)`, tone.base),
            boxShadow: shadows(sk.shade(size * 0.05, tone.lip, 0.6)),
          }}>
            <Icon name="close" size={size * 0.55} shade={rgba(tone.lip, 0.9)} />
          </View>
        </View>
      )}
    </Pressable>
  );
}
