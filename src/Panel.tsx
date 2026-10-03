// The kit's popup card: a cream face inside a thick glossy rim, with an optional cookie title and close button.
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { darken, lighten, rgba } from './color';
import { Ribbon } from './Ribbon';
import { CloseButton } from './RoundButton';
import { useTheme } from './theme';

export type PanelProps = {
  children?: React.ReactNode;
  /** Rim color (default: the theme's panel rim). */
  rim?: string;
  /** Face color (default: the theme's cream). */
  face?: string;
  rimWidth?: number;
  radius?: number;
  padding?: number;
  /** Text for the cookie title, or your own node (e.g. an Icon). */
  title?: string;
  titleNode?: React.ReactNode;
  titleWidth?: number;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Panel({
  children, rim, face, rimWidth = 9, radius = 30, padding = 18, title, titleNode, titleWidth = 190, onClose, style, contentStyle,
}: PanelProps) {
  const t = useTheme();
  const r = rim ?? t.panel.rim;
  const f = face ?? t.panel.face;
  const hasTitle = !!(title || titleNode);
  return (
    <View style={[{ paddingTop: hasTitle ? 30 : 0 }, style]}>
      <View style={{
        borderRadius: radius, padding: rimWidth,
        backgroundImage: `linear-gradient(180deg, ${lighten(r, 0.18)} 0%, ${r} 50%, ${darken(r, 0.12)} 100%)`,
        boxShadow: `0 6px 0 ${darken(r, 0.35)}, 0 14px 22px ${rgba('#000000', 0.38)}, inset 0 2px 0 ${rgba('#ffffff', 0.45)}, inset 0 0 0 1px ${rgba(darken(r, 0.3), 0.6)}`,
      }}>
        <View style={[{
          borderRadius: radius - rimWidth, padding, paddingTop: hasTitle ? padding + 26 : padding,
          backgroundImage: `linear-gradient(180deg, ${t.panel.faceTop} 0%, ${f} 100%)`,
          boxShadow: `inset 0 3px 6px ${rgba(darken(r, 0.4), 0.28)}, inset 0 0 0 2px ${rgba(darken(f, 0.1), 0.6)}`,
        }, contentStyle]}>
          {children}
        </View>
      </View>
      {hasTitle ? (
        <Ribbon width={titleWidth} title={title} style={{ position: 'absolute', top: 0, left: 8 }}>{titleNode}</Ribbon>
      ) : null}
      {onClose ? <CloseButton onPress={onClose} style={{ position: 'absolute', right: -8, top: hasTitle ? 18 : -12 }} /> : null}
    </View>
  );
}
