// Surface's hook for 3D skins: the rendered body image, or undefined while it renders (or without WebGL).
import { useEffect, useState } from 'react';
import { Body, bodyKey, cachedBody, renderBody } from './render3d';

export function useBody3D(b: Body | null): string | undefined {
  const key = b ? bodyKey(b) : '';
  const [img, setImg] = useState<string | undefined>(() => (b ? cachedBody(b) : undefined));
  useEffect(() => {
    if (!b) { setImg(undefined); return; }
    const hit = cachedBody(b);
    if (hit) { setImg(hit); return; }
    let live = true;
    renderBody(b).then(u => { if (live) setImg(u); });
    return () => { live = false; };
  }, [key]);
  return b ? img : undefined;
}
