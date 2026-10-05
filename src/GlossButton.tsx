// The kit's main button: a candy pill with a thick 3D lip, soft stripes and a white highlight (in the glossy skin).
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { rgba } from './color';
import { Label } from './parts';
import { useSkin } from './skin';
import { Surface } from './Surface';
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
  const sk = useSkin();
  return (
    <Pressable disabled={disabled} {...press} style={[{ width, height: H + sk.lipH(lip) }, style]}>
      {({ pressed }) => (
        <Surface
          tone={tone} height={H} radius={r} lip={lip} pressed={pressed}
          shine={[Math.max(1.5, H * 0.04), 0.7]} shade={[Math.max(2, H * 0.06), 0.55]} line={[1, 0.5]}
          stripes={stripes && { color: rgba('#ffffff', 0.09) }} faceWidth={box.w} onFaceLayout={onLayout}
          gloss={{ inset: Math.min(r * 0.45, box.w * 0.08) + 4, top: H * 0.08, height: H * 0.36, radius: Math.max(0, r - 4), strength: 0.42 }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: H * 0.3 }}>
            {title ? <Label size={H * 0.4} edge={tone.lip}>{title}</Label> : null}
            {children}
          </View>
        </Surface>
      )}
    </Pressable>
  );
}
