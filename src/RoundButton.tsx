// Round glossy icon buttons (settings, shop, profile) and the kit's brown-ringed close button.
import React from 'react';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { rgba } from './color';
import { Icon, IconName } from './Icon';
import { Stripes } from './parts';
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
  return (
    <Pressable disabled={disabled} {...press} style={[{ width: size, height: size + lip }, style]}>
      {({ pressed }) => (
        <View style={{ flex: 1 }}>
          <View style={{
            position: 'absolute', left: 0, top: lip, width: size, height: size, borderRadius: size / 2,
            backgroundColor: tone.lip, boxShadow: `0 ${lip}px ${lip * 1.6}px ${rgba('#000000', 0.32)}`, opacity: pressed ? 0 : 1,
          }} />
          <View style={{
            position: 'absolute', left: 0, top: pressed ? lip : 0, width: size, height: size, borderRadius: size / 2, overflow: 'hidden',
            backgroundImage: `radial-gradient(circle at 50% 30%, ${tone.top} 0%, ${tone.base} 55%, ${tone.dark} 100%)`,
            boxShadow: `inset 0 ${size * 0.04}px 0 ${rgba('#ffffff', 0.65)}, inset 0 -${size * 0.05}px 0 ${rgba(tone.lip, 0.5)}, inset 0 0 0 1px ${rgba(tone.lip, 0.55)}`,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Stripes width={size} height={size} color={rgba('#ffffff', 0.12)} band={size * 0.2} />
            <View pointerEvents="none" style={{
              position: 'absolute', left: size * 0.16, right: size * 0.16, top: size * 0.07, height: size * 0.36, borderRadius: size,
              backgroundImage: `linear-gradient(180deg, ${rgba('#ffffff', 0.5)} 0%, ${rgba('#ffffff', 0.04)} 100%)`,
            }} />
            {icon ? <Icon name={icon} size={size * 0.52} shade={rgba(tone.lip, 0.85)} /> : children}
          </View>
        </View>
      )}
    </Pressable>
  );
}

/** The kit's close button: a brown ring around a glossy orange ball with a white ×. */
export function CloseButton({ size = 40, color, style, ...press }: Omit<RoundButtonProps, 'icon' | 'children'>) {
  const t = useTheme();
  const tone = useTone(color);
  const ring = size * 0.12;
  return (
    <Pressable hitSlop={8} {...press} style={[{ width: size, height: size }, style]}>
      {({ pressed }) => (
        <View style={{
          width: size, height: size, borderRadius: size / 2, padding: ring, transform: [{ scale: pressed ? 0.92 : 1 }],
          backgroundColor: t.ribbon.cookie,
          boxShadow: `0 ${size * 0.08}px ${size * 0.14}px ${rgba('#000000', 0.4)}, inset 0 1px 0 ${rgba('#ffffff', 0.35)}`,
        }}>
          <View style={{
            flex: 1, borderRadius: size, alignItems: 'center', justifyContent: 'center',
            backgroundImage: `radial-gradient(circle at 50% 30%, ${tone.light} 0%, ${tone.base} 60%, ${tone.dark} 100%)`,
            boxShadow: `inset 0 -${size * 0.05}px 0 ${rgba(tone.lip, 0.6)}`,
          }}>
            <Icon name="close" size={size * 0.55} shade={rgba(tone.lip, 0.9)} />
          </View>
        </View>
      )}
    </Pressable>
  );
}
