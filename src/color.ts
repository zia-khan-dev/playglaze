// Small color helpers: every component builds its light, face, dark and lip colors from one base hex.

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

export function parse(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const toHex = ([r, g, b]: number[]) => '#' + [r, g, b].map(v => clamp(v).toString(16).padStart(2, '0')).join('');

/** Mix two colors: t = 0 gives a, t = 1 gives b. */
export function mix(a: string, b: string, t: number) {
  const x = parse(a), y = parse(b);
  return toHex(x.map((v, i) => v + (y[i] - v) * t));
}

export const lighten = (c: string, t: number) => mix(c, '#ffffff', t);
export const darken = (c: string, t: number) => mix(c, '#000000', t);

export function rgba(c: string, a: number) {
  const [r, g, b] = parse(c);
  return `rgba(${r},${g},${b},${a})`;
}

/** The five shades a glossy part is drawn with. */
export type Tone = { light: string; top: string; base: string; dark: string; lip: string; ink: string };

export function tone(base: string): Tone {
  return {
    light: lighten(base, 0.55),
    top: lighten(base, 0.22),
    base,
    dark: darken(base, 0.12),
    lip: darken(base, 0.36),
    ink: darken(base, 0.55),
  };
}
