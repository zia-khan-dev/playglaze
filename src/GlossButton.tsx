// The kit's main button: a glossy candy pill with a thick 3D lip, soft stripes and a white highlight.
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { rgba } from './color';
import { Gloss, Label, Stripes } from './parts';
import { ColorProp, useTone } from './theme';

export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export const BUTTON_H: Record<ButtonSize, number> = { xl: 72, lg: 60, md: 48, sm: 38, xs: 30 };

export type GlossButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  color?: ColorProp;
  size?: ButtonSize;
  /** A label (drawn with Label) or any content such as an Icon. */
  title?: string;
  children?: React.ReactNode;
  /** Fixed width; by default the button fills its parent's width (wrap it to size it). */
  width?: number;
  /** Corner radius; by default a full pill. Pass e.g. 14 for the kit's square-ish tab buttons. */
  radius?: number;
  stripes?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function useLayoutSize() {
  const [box, setBox] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== box.w || height !== box.h) setBox({ w: width, h: height });
  };
  return [box, onLayout] as const;
}

export function GlossButton({
  color, size = 'lg', title, children, width, radius, stripes = true, disabled, style, ...press
}: GlossButtonProps) {
  const tone = useTone(disabled ? 'gray' : color);
  const H = BUTTON_H[size];
  const lip = Math.round(H * 0.11);
  const r = radius ?? H / 2;
  const [box, onLayout] = useLayoutSize();
  return (
    <Pressable disabled={disabled} {...press} style={[{ width, height: H + lip }, style]}>
      {({ pressed }) => (
        <View style={{ flex: 1 }}>
          {/* lip + drop shadow */}
          <View style={{
            position: 'absolute', left: 0, right: 0, top: lip, height: H, borderRadius: r,
            backgroundColor: tone.lip, boxShadow: `0 ${lip * 0.6}px ${lip * 1.2}px ${rgba('#000000', 0.32)}`,
            opacity: pressed ? 0 : 1,
          }} />
          {/* face */}
          <View onLayout={onLayout} style={{
            position: 'absolute', left: 0, right: 0, top: pressed ? lip : 0, height: H, borderRadius: r, overflow: 'hidden',
            backgroundImage: `linear-gradient(180deg, ${tone.top} 0%, ${tone.base} 48%, ${tone.dark} 100%)`,
            boxShadow: `inset 0 ${Math.max(1.5, H * 0.04)}px 0 ${rgba('#ffffff', 0.7)}, inset 0 -${Math.max(2, H * 0.06)}px 0 ${rgba(tone.lip, 0.55)}, inset 0 0 0 1px ${rgba(tone.lip, 0.5)}`,
          }}>
            {stripes && box.w > 0 ? <Stripes width={box.w} height={H} color={rgba('#ffffff', 0.09)} /> : null}
            <Gloss inset={Math.min(r * 0.45, box.w * 0.08) + 4} top={H * 0.08} height={H * 0.36} radius={Math.max(0, r - 4)} strength={0.42} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: H * 0.3 }}>
              {title ? <Label size={H * 0.4} edge={tone.lip}>{title}</Label> : null}
              {children}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}
