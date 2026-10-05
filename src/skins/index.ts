// Free skins. Each is a plain Skin object.
import { glossy, Skin } from '../skin';
import { cartoon } from './cartoon';
import { minimal } from './minimal';

export { glossy, cartoon, minimal };
export const SKINS: Record<string, Skin> = { glossy, cartoon, minimal };
