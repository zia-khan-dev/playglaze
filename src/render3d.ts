// Real 3D bodies for skins with `render: 'three'`: one shared offscreen three.js renderer draws each button body as a
// lit, beveled mesh (a face slab over its lip slab) and hands back a PNG that Surface shows. Results are cached by
// size, colors and material, so a screen of buttons renders each distinct body once. three.js is an optional peer
// dependency, loaded only when a 3D skin is used; on platforms without WebGL the CSS look is used instead.
import { Platform } from 'react-native';
import { lighten } from './color';

export type BodyMaterial = 'plastic' | 'metal' | 'glass';
export type Body = {
  w: number; h: number; r: number; lip: number; shape: 'linear' | 'radial'; pressed?: boolean;
  base: string; lipColor: string; material: BodyMaterial;
};

const SCALE = 2;
const cache = new Map<string, string>();
const pending = new Map<string, Promise<string | undefined>>();
let engine: Promise<Engine | undefined> | undefined;

type Engine = { T: typeof import('three'); renderer: import('three').WebGLRenderer; env: import('three').Texture };

export const can3d = () => Platform.OS === 'web' && typeof (globalThis as any).document !== 'undefined';
export const bodyKey = (b: Body) => JSON.stringify([Math.round(b.w), Math.round(b.h), Math.round(b.r), Math.round(b.lip), b.shape, !!b.pressed, b.base, b.lipColor, b.material]);
export const cachedBody = (b: Body) => cache.get(bodyKey(b));

function start(): Promise<Engine | undefined> {
  engine ??= (async () => {
    try {
      const T = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1);
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.NeutralToneMapping;
      renderer.toneMappingExposure = 0.9;
      const pm = new T.PMREMGenerator(renderer);
      const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
      return { T, renderer, env };
    } catch {
      return undefined; // three.js missing or no WebGL: Surface keeps its CSS look
    }
  })();
  return engine;
}

/** A rounded rectangle outline (centered) for extrusion. */
function rounded(T: Engine['T'], w: number, h: number, r: number) {
  const s = new T.Shape(), x = -w / 2, y = -h / 2;
  r = Math.max(0.01, Math.min(r, w / 2, h / 2));
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function draw(E: Engine, b: Body): string {
  const { T, renderer, env } = E;
  const W = Math.max(2, b.w), H = Math.max(2, b.h), L = Math.max(0, b.lip);
  const total = H + L;
  renderer.setSize(Math.ceil(W * SCALE), Math.ceil(total * SCALE), false);
  const scene = new T.Scene();
  scene.environment = env;
  // orthographic, 1 unit = 1 pt; y = 0 at the top of the image
  const cam = new T.OrthographicCamera(-W / 2, W / 2, 0, -total, -500, 500);
  cam.position.set(0, 0, 200); cam.lookAt(0, 0, 0);
  // the material of the face
  const P = (o: import('three').MeshPhysicalMaterialParameters) => new T.MeshPhysicalMaterial(o);
  const face = b.material === 'metal'
    ? P({ color: lighten(b.base, 0.1), metalness: 1, roughness: 0.26, clearcoat: 0.5, clearcoatRoughness: 0.15, envMapIntensity: 1.0 })
    : b.material === 'glass'
      ? P({ color: b.base, metalness: 0, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.03, transparent: true, opacity: 0.88, emissive: b.base, emissiveIntensity: 0.22, iridescence: 0.3, envMapIntensity: 0.6 })
      : P({ color: b.base, metalness: 0, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 0.35 });
  const base = P({ color: b.lipColor, metalness: b.material === 'metal' ? 0.9 : 0, roughness: 0.5, envMapIntensity: 0.3 });

  const bevel = b.shape === 'radial' ? 0 : Math.max(1.5, Math.min(H * 0.22, W * 0.2, 9));
  const top = b.pressed ? L : 0; // a pressed face sits down on its lip
  const mk = (mat: import('three').Material, y: number, z: number) => {
    let m: import('three').Mesh;
    if (b.shape === 'radial') {
      m = new T.Mesh(new T.SphereGeometry(0.5, 64, 48), mat);
      m.scale.set(W, H, Math.min(W, H) * 0.7);
    } else {
      const g = new T.ExtrudeGeometry(rounded(T, W - bevel * 2, H - bevel * 2, Math.max(0.5, b.r - bevel)), {
        depth: 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 8, curveSegments: 16,
      });
      m = new T.Mesh(g, mat);
    }
    m.position.set(0, y, z);
    scene.add(m);
    return m;
  };
  if (L > 0 && !b.pressed) mk(base, -H / 2 - L, -12);
  mk(face, -H / 2 - top, 0);

  scene.add(new T.AmbientLight('#ffffff', 0.25));
  const key = new T.DirectionalLight('#FFF4E6', 1.9); key.position.set(-0.6, 1.4, 1.6); scene.add(key);
  const rim = new T.DirectionalLight('#BFDFFF', 0.5); rim.position.set(0.8, -0.6, 1); scene.add(rim);

  renderer.setClearColor(0x000000, 0);
  renderer.render(scene, cam);
  const url: string = (renderer.domElement as any).toDataURL('image/png');
  scene.traverse((o: any) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
  return url;
}

/** The PNG of a body (from the cache, or rendered now). Undefined when 3D isn't available. */
export function renderBody(b: Body): Promise<string | undefined> {
  const key = bodyKey(b);
  const hit = cache.get(key);
  if (hit) return Promise.resolve(hit);
  if (!can3d()) return Promise.resolve(undefined);
  if (!pending.has(key)) {
    pending.set(key, start().then(E => {
      pending.delete(key);
      if (!E) return undefined;
      const url = draw(E, b);
      if (cache.size > 400) cache.delete(cache.keys().next().value!);
      cache.set(key, url);
      return url;
    }));
  }
  return pending.get(key)!;
}
