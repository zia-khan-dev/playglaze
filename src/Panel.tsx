// The kit's popup card: a cream face inside a thick glossy rim, with an optional cookie title and close button.
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { darken, lighten, rgba } from './color';
import { Ribbon } from './Ribbon';
import { CloseButton } from './RoundButton';
import { useTheme } from './theme';
import { shadows, useSkin } from './skin';
import { Texture } from './Texture';

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
  const sk = useSkin();
  const rad = sk.r(radius);
  const r = rim ?? t.panel.rim;
  const f = face ?? t.panel.face;
  const hasTitle = !!(title || titleNode);
  return (
    <View style={[{ paddingTop: hasTitle ? 30 : 0 }, style]}>
      <View style={{
        borderRadius: rad, padding: rimWidth, overflow: sk.skin.texture ? 'hidden' : undefined,
        ...sk.paint(`linear-gradient(180deg, ${lighten(r, 0.18)} 0%, ${r} 50%, ${darken(r, 0.12)} 100%)`, r),
        boxShadow: shadows(sk.lip(6, darken(r, 0.35)), sk.drop(14, 22, 0.38), sk.shine(2, 0.45), sk.line(1, rgba(darken(r, 0.3), 0.6))),
      }}>
        <Texture name={sk.skin.texture} />
        <View style={[{
          borderRadius: Math.max(0, rad - rimWidth), padding, overflow: sk.skin.faceTexture ? 'hidden' : undefined, paddingTop: hasTitle ? padding + 26 : padding,
          ...sk.paint(`linear-gradient(180deg, ${t.panel.faceTop} 0%, ${f} 100%)`, f),
          boxShadow: shadows(sk.well(3, 6, darken(r, 0.4), 0.28), sk.line(2, rgba(darken(f, 0.1), 0.6))),
        }, contentStyle]}>
          <Texture name={sk.skin.faceTexture} />
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
