// Themes: a set of named button colors plus the panel, ribbon and text colors.
import React, { createContext, useContext, useMemo } from 'react';
import { tone, Tone } from './color';

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
  colors: {
    orange: '#FF8A00', yellow: '#FFD21A', red: '#FF2D55', blue: '#00C2FF',
    purple: '#8B2CF5', green: '#10C981', pink: '#FF4FB8', gray: '#5A5470',
  },
  primary: 'purple',
  panel: { rim: '#6D3BD8', face: '#2A1F52', faceTop: '#3A2C6E', line: '#4A3A86' },
  ribbon: { cookie: '#5A2DB0', filling: '#F59E0B' },
  slot: { face: '#33276A', rim: '#8B5CF6' },
  groove: '#120D26',
  text: { color: '#FFFFFF', shadow: '#1A0B3A', dark: '#EDE7FF' },
};

const Ctx = createContext<Theme>(bright);

export function ThemeProvider({ theme = bright, children }: { theme?: Partial<Theme>; children: React.ReactNode }) {
  const value = useMemo(() => ({ ...bright, ...theme, colors: { ...bright.colors, ...theme.colors } }) as Theme, [theme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

/** Turns a color prop (name or hex) into its tone, using the current theme. */
export function useTone(color?: ColorProp): Tone {
  const t = useTheme();
  const hex = !color ? t.colors[t.primary] : (t.colors as Record<string, string>)[color] ?? color;
  return useMemo(() => tone(hex), [hex]);
}
