// A popup: a dimmed backdrop and a Panel that pops in with a bounce.
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Panel, PanelProps } from './Panel';

export type PopupProps = Omit<PanelProps, 'style'> & {
  visible: boolean;
  /** Called when the close button or (with closeOnBackdrop) the backdrop is tapped. */
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  /** Backdrop darkness, 0..1. */
  dim?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Renders over its parent (position absolute, full size). Put it at the end of a screen so it covers the screen.
 * It stays mounted while it animates out.
 */
export function Popup({ visible, onClose, closeOnBackdrop = true, dim = 0.55, width = 320, style, ...panel }: PopupProps) {
  const anim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [shown, setShown] = useState(visible);
  useEffect(() => {
    if (visible) setShown(true);
    Animated.spring(anim, { toValue: visible ? 1 : 0, useNativeDriver: true, speed: 16, bounciness: visible ? 10 : 0 })
      .start(({ finished }) => { if (finished && !visible) setShown(false); });
  }, [visible, anim]);
  if (!shown) return null;
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', zIndex: 100 }, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${dim})`, opacity: anim }]}>
        <Pressable style={{ flex: 1 }} onPress={closeOnBackdrop ? onClose : undefined} />
      </Animated.View>
      <Animated.View style={{
        width, maxWidth: '92%',
        opacity: anim,
        transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }],
      }}>
        <Panel {...panel} onClose={onClose} />
      </Animated.View>
    </Animated.View>
  );
}
