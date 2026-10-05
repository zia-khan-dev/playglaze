// Themes: a set of named button colors plus the panel, ribbon and text colors.
import React, { createContext, useContext, useMemo } from 'react';
import { tone, Tone } from './color';
import { Skin, SkinProvider } from './skin';

export type ColorName = 'orange' | 'yellow' | 'red' | 'blue' | 'purple' | 'green' | 'pink' | 'gray';
/** A named theme color, or any hex like '#22c55e'. */
export type ColorProp = ColorName | (string & {});

export type Theme = {
  colors: Record<ColorName, string>;
  /** The main color: buttons, panel rims, toggles and progress fills use it when no color is given. */
  primary: ColorName;
  panel: { rim: string; face: string; faceTop: string; line: string };
  ribbon: { cookie: string; filling: string };
  slot: { face: string; rim: string };
  groove: string;
  text: { color: string; shadow: string; dark: string };
  fontFamily?: string;
  /** Font for the bold labels (buttons, ribbons, numbers). Falls back to fontFamily. */
  displayFont?: string;
};

export const bright: Theme = {
  colors: {
    orange: '#F9A10C', yellow: '#FFC21A', red: '#F5332B', blue: '#1FB5F5',
    purple: '#A12CF0', green: '#52C41A', pink: '#FF4F9A', gray: '#9AA0A6',
  },
  primary: 'orange',
  panel: { rim: '#F28A2E', face: '#F7E6C4', faceTop: '#FCF3DE', line: '#E8CFA0' },
  ribbon: { cookie: '#9A5A2C', filling: '#F6C24A' },
  slot: { face: '#F3DDB3', rim: '#F59A0F' },
  groove: '#3A3A44',
  text: { color: '#FFFFFF', shadow: '#7A3A0A', dark: '#8A4A1C' },
};

export const dark: Theme = {
  // Deep jewel tones that glow on a night background (ruby, amber, topaz, sapphire, amethyst, emerald).
  colors: {
    orange: '#FF6A00', yellow: '#FFD000', red: '#FF0055', blue: '#00B4FF',
    purple: '#7B2CF5', green: '#00D27A', pink: '#E81CFF', gray: '#4A4466',
  },
  primary: 'purple',
  panel: { rim: '#5B2BD0', face: '#1E1640', faceTop: '#2E2260', line: '#3E2F7A' },
  ribbon: { cookie: '#3A1A8C', filling: '#FF9F1C' },
  slot: { face: '#2A2058', rim: '#8B5CF6' },
  groove: '#0B0718',
  text: { color: '#FFFFFF', shadow: '#12062E', dark: '#F1EBFF' },
};

const Ctx = createContext<Theme>(bright);

/** Colors come from `theme`, the material and shapes from `skin` (default: the outer skin, or glossy). */
export function ThemeProvider({ theme, skin, children }: { theme?: Partial<Theme>; skin?: Partial<Skin>; children: React.ReactNode }) {
  const st = skin?.theme;
  const value = useMemo(
    () => ({ ...bright, ...st, ...theme, colors: { ...bright.colors, ...st?.colors, ...theme?.colors } }) as Theme,
    [theme, st],
  );
  return <Ctx.Provider value={value}><SkinProvider skin={skin}>{children}</SkinProvider></Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

/** Turns a color prop (name or hex) into its tone, using the current theme. */
export function useTone(color?: ColorProp): Tone {
  const t = useTheme();
  const hex = !color ? t.colors[t.primary] : (t.colors as Record<string, string>)[color] ?? color;
  return useMemo(() => tone(hex), [hex]);
}
