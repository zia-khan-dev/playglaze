// Free skins. Each is a plain Skin object.
import { glossy, Skin } from '../skin';
import { cartoon } from './cartoon';
import { minimal } from './minimal';
import { toy3d } from './toy3d';

export { glossy, cartoon, minimal, toy3d };
export const SKINS: Record<string, Skin> = { glossy, cartoon, minimal, toy3d };
