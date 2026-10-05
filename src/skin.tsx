// Skins: the material and shape of every surface (gloss, lips, outlines, shadows, corners), separate from its colors.
// A skin is plain data. Every value is a multiplier or switch on the kit's own look, so `glossy` (all 1s) is the original.
import React, { createContext, useContext, useMemo } from 'react';
import { rgba } from './color';
import type { Theme } from './theme';

export type TextureName =
  | 'wood' | 'stone' | 'carbon' | 'halftone' | 'paper' | 'felt' | 'metal' | 'scratch' | 'scanlines' | 'pixel' | 'bubbles' | 'sparkle';

export type Skin = {
  name: string;
  /** Faces use top-to-bottom gradients; false paints them one flat color. */
  gradient: boolean;
  /** Strength of the white highlight pill (Gloss), 0 hides it. */
  gloss: number;
  /** Soft diagonal candy stripes on colored faces. */
  stripes: boolean;
  /** Strength of the thin inset top highlight and bottom shade. */
  shine: number;
  /** Depth of the 3D lip under raised parts, 0 makes them flat. */
  lip: number;
  /** Drop shadows: soft blur, hard (no blur), a neon glow in `glow` color, or none. */
  drop: 'soft' | 'hard' | 'glow' | 'none';
  /** Extra outline width in px on every surface (cartoon ink lines); 0 keeps the kit's thin rim lines. */
  outline: number;
  /** Outline color when outline > 0. */
  ink: string;
  /** Multiplier on corner radii (1 = the kit's round shapes). */
  radius: number;
  /** How Label draws its text edge: a dropped edge under the text, an outline around it, or a neon glow. */
  label: 'edge' | 'outline' | 'glow';
  /** Neon color for drop 'glow' and label 'glow'. */
  glow?: string;
  /** A second line inside the outline (gold trim, a white sticker edge). */
  trim?: string;
  /** Pattern over colored faces and panel rims. */
  texture?: TextureName;
  /** Pattern over cream panel faces and cards. */
  faceTexture?: TextureName;
  /** Shape of the Ribbon title plate: the kit's scalloped cookie, a plain plate, or a banner with notched ends. */
  plate?: 'cookie' | 'plate' | 'banner';
  /** Slant of bar-shaped buttons in degrees (racing, cyber). Balls never slant. */
  skew?: number;
  /** Colors that suit this skin (panels, ribbons, text). ThemeProvider applies them under your own theme. */
  theme?: Partial<Theme>;
};

export const glossy: Skin = {
  name: 'glossy', gradient: true, gloss: 1, stripes: true, shine: 1, lip: 1,
  drop: 'soft', outline: 0, ink: '#1A1030', radius: 1, label: 'edge',
};

const SkinCtx = createContext<Skin>(glossy);

/** Provides a skin to everything inside it. ThemeProvider takes a `skin` prop that does the same. */
export function SkinProvider({ skin, children }: { skin?: Partial<Skin>; children: React.ReactNode }) {
  const outer = useContext(SkinCtx);
  const value = useMemo(() => (skin ? { ...outer, ...skin } : outer), [outer, skin]);
  return <SkinCtx.Provider value={value}>{children}</SkinCtx.Provider>;
}

/** Draw helpers bound to a skin. Each returns '' when the skin turns that layer off; join them with `shadows`. */
export function skinKit(s: Skin) {
  const px = (n: number) => `${n}px`;
  return {
    skin: s,
    /** A corner radius in this skin. */
    r: (n: number) => n * s.radius,
    /** A lip depth in this skin. */
    lipH: (n: number) => n * s.lip,
    /** A face fill: the gradient, or the flat color when the skin has no gradients. */
    paint: (gradient: string, flat: string) => (s.gradient ? { backgroundImage: gradient } : { backgroundColor: flat }),
    /** A black drop shadow. */
    drop: (y: number, blur: number, alpha: number) =>
      s.drop === 'none' ? '' : s.drop === 'hard' ? `0 ${px(y)} 0 ${rgba('#000000', alpha)}`
        : s.drop === 'glow' ? `0 0 ${px(Math.max(6, blur * 1.2))} ${rgba(s.glow ?? '#22D3EE', Math.min(1, alpha * 2.2))}`
        : `0 ${px(y)} ${px(blur)} ${rgba('#000000', alpha)}`,
    /** A solid offset under a part (its lip). */
    lip: (y: number, color: string) => (s.lip ? `0 ${px(y * s.lip)} 0 ${color}` : ''),
    /** The thin white highlight along the top inside edge. */
    shine: (y: number, alpha: number, color = '#ffffff') => (s.shine ? `inset 0 ${px(y)} 0 ${rgba(color, alpha * s.shine)}` : ''),
    /** A thin white highlight just outside the bottom edge (under grooves). */
    glint: (y: number, alpha: number) => (s.shine ? `0 ${px(y)} 0 ${rgba('#ffffff', alpha * s.shine)}` : ''),
    /** The darker band along the bottom inside edge. */
    shade: (y: number, color: string, alpha: number) => (s.shine ? `inset 0 -${px(y)} 0 ${rgba(color, alpha * s.shine)}` : ''),
    /** A recessed (sunk-in) inner shadow. */
    well: (y: number, blur: number, color: string, alpha: number) => `inset 0 ${px(y)} ${px(blur)} ${rgba(color, alpha)}`,
    /** The inside rim line; outlined skins widen it and paint it in ink. Pass w = 0 for an outline-only line. */
    line: (w: number, color: string) => {
      const main = s.outline ? `inset 0 0 0 ${px(w + s.outline)} ${s.ink}` : w ? `inset 0 0 0 ${px(w)} ${color}` : '';
      if (!s.trim) return main;
      const trim = `inset 0 0 0 ${px((s.outline ? w + s.outline : w) + 2)} ${s.trim}`;
      return main ? `${main}, ${trim}` : trim;
    },
  };
}

export type SkinKit = ReturnType<typeof skinKit>;

export function useSkin(): SkinKit {
  const s = useContext(SkinCtx);
  return useMemo(() => skinKit(s), [s]);
}

/** Joins box-shadow layers, dropping the empty ones. */
export const shadows = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(', ') || undefined;
