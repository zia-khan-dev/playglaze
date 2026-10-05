// Inputs and meters in the kit's style: progress bar, toggle, checkbox and slider.
import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { rgba } from './color';
import { Icon } from './Icon';
import { Gloss, Stripes } from './parts';
import { useLayoutSize } from './GlossButton';
import { ColorProp, useTheme, useTone } from './theme';
import { shadows, useSkin } from './skin';

/** A dark (or cream) groove with a glossy, striped fill. value: 0..1. */
export function ProgressBar({ value, color, height = 22, groove, style, children }: {
  value: number; color?: ColorProp; height?: number; groove?: string; style?: StyleProp<ViewStyle>; children?: React.ReactNode;
}) {
  const t = useTheme();
  const tone = useTone(color);
  const [box, onLayout] = useLayoutSize();
  const sk = useSkin();
  const v = Math.max(0, Math.min(1, value));
  const pad = Math.max(2, height * 0.14);
  const inner = height - pad * 2;
  const fillW = v > 0 ? Math.max(inner, (box.w - pad * 2) * v) : 0;
  return (
    <View onLayout={onLayout} style={[{
      height, borderRadius: sk.r(height / 2), padding: pad, backgroundColor: groove ?? t.groove,
      boxShadow: shadows(sk.well(2, 3, '#000000', 0.45), sk.glint(1, 0.35), sk.line(0, '')),
    }, style]}>
      {fillW > 0 ? (
        <View style={{
          width: fillW, height: inner, borderRadius: sk.r(inner / 2), overflow: 'hidden',
          ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.base} 55%, ${tone.dark} 100%)`, tone.base),
          boxShadow: shadows(sk.shade(2, tone.lip, 0.5)),
        }}>
          <Stripes width={fillW} height={inner} color={rgba(tone.lip, 0.22)} band={inner * 0.55} gap={inner * 0.55} />
          <Gloss inset={inner * 0.3} top={inner * 0.1} height={inner * 0.38} radius={inner} strength={0.6} />
        </View>
      ) : null}
      {children ? <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>{children}</View> : null}
    </View>
  );
}

/** The kit's glossy knob: a brown ring around a shiny ball. */
function Knob({ size, color }: { size: number; color?: ColorProp }) {
  const t = useTheme();
  const tone = useTone(color);
  const sk = useSkin();
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2, padding: size * 0.1, backgroundColor: t.ribbon.cookie,
      boxShadow: shadows(sk.drop(size * 0.08, size * 0.16, 0.4), sk.shine(1, 0.3), sk.line(0, '')),
    }}>
      <View style={{
        flex: 1, borderRadius: size,
        ...sk.paint(`radial-gradient(circle at 50% 30%, ${tone.light} 0%, ${tone.base} 55%, ${tone.dark} 100%)`, tone.base),
      }} />
    </View>
  );
}

/** An on/off switch: a striped colored groove when on, gray when off, with a sliding knob. */
export function Toggle({ value, onChange, color, width = 64, style }: {
  value: boolean; onChange?: (v: boolean) => void; color?: ColorProp; width?: number; style?: StyleProp<ViewStyle>;
}) {
  const on = useTone(color);
  const off = useTone('gray');
  const tone = value ? on : off;
  const h = width * 0.5;
  const pos = useRef(new Animated.Value(value ? 1 : 0)).current;
  useEffect(() => { Animated.spring(pos, { toValue: value ? 1 : 0, useNativeDriver: true, speed: 18, bounciness: 8 }).start(); }, [value, pos]);
  const knob = h * 1.12;
  const sk = useSkin();
  return (
    <Pressable onPress={() => onChange?.(!value)} hitSlop={8} style={[{ width, height: knob, justifyContent: 'center' }, style]}>
      <View style={{
        height: h, borderRadius: sk.r(h / 2), overflow: 'hidden',
        ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.base} 55%, ${tone.dark} 100%)`, tone.base),
        boxShadow: shadows(sk.well(2, 3, tone.lip, 0.6), sk.line(1, rgba(tone.lip, 0.6))),
      }}>
        <Stripes width={width} height={h} color={rgba('#ffffff', 0.16)} band={h * 0.4} />
      </View>
      <Animated.View style={{
        position: 'absolute', top: 0,
        transform: [{ translateX: pos.interpolate({ inputRange: [0, 1], outputRange: [-knob * 0.12, width - knob * 0.88] }) }],
      }}>
        <Knob size={knob} color={value ? color : 'gray'} />
      </Animated.View>
    </Pressable>
  );
}

/** A rounded square check box: cream with a colored rim when off, solid with a white check when on. */
export function Checkbox({ value, onChange, color, size = 32, style }: {
  value: boolean; onChange?: (v: boolean) => void; color?: ColorProp; size?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const tone = useTone(color);
  const sk = useSkin();
  const r = sk.r(size * 0.28);
  return (
    <Pressable onPress={() => onChange?.(!value)} hitSlop={8} style={style}>
      <View style={{
        width: size, height: size, borderRadius: r, padding: size * 0.1,
        ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`, tone.base),
        boxShadow: shadows(sk.lip(2, tone.lip), sk.drop(3, 5, 0.3), sk.line(0, '')),
      }}>
        <View style={{
          flex: 1, borderRadius: r * 0.7, alignItems: 'center', justifyContent: 'center',
          ...(value
            ? sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.base} 100%)`, tone.base)
            : sk.paint(`linear-gradient(180deg, ${t.panel.faceTop} 0%, ${t.slot.face} 100%)`, t.slot.face)),
          boxShadow: shadows(value ? sk.shine(1, 0.5) : sk.well(2, 3, tone.lip, 0.35)),
        }}>
          {value ? <Icon name="check" size={size * 0.72} shade={rgba(tone.lip, 0.9)} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

/** A cream groove with a colored fill and a draggable knob. value: 0..1. */
export function Slider({ value, onChange, color, height = 16, style }: {
  value: number; onChange?: (v: number) => void; color?: ColorProp; height?: number; style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const tone = useTone(color);
  const [box, onLayout] = useLayoutSize();
  const knob = height * 2;
  const sk = useSkin();
  const w = useRef(0);
  w.current = box.w;
  const cb = useRef(onChange);
  cb.current = onChange;
  const set = (x: number) => w.current > 0 && cb.current?.(Math.max(0, Math.min(1, x / w.current)));
  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: e => set(e.nativeEvent.locationX),
    onPanResponderMove: e => set(e.nativeEvent.locationX),
  })).current;
  const v = Math.max(0, Math.min(1, value));
  return (
    <View onLayout={onLayout} style={[{ height: knob, justifyContent: 'center' }, style]} {...pan.panHandlers}>
      <View pointerEvents="none" style={{
        height, borderRadius: sk.r(height / 2), padding: 3, backgroundColor: t.slot.face,
        boxShadow: shadows(sk.well(2, 3, tone.lip, 0.35), sk.glint(1, 0.6), sk.line(0, '')),
      }}>
        <View style={{
          width: Math.max(height - 6, (box.w - 6) * v), flex: 1, borderRadius: sk.r(height),
          ...sk.paint(`linear-gradient(180deg, ${tone.top} 0%, ${tone.dark} 100%)`, tone.base),
        }} />
      </View>
      <View pointerEvents="none" style={{ position: 'absolute', left: v * box.w - knob / 2, top: 0 }}>
        <Knob size={knob} color={color} />
      </View>
    </View>
  );
}
