// Toy 3D: button bodies are real 3D renders (three.js) in glossy toy plastic, with real bevels and reflections.
import { Skin } from '../skin';

export const toy3d: Skin = {
  name: 'toy3d', gradient: true, gloss: 0, stripes: false, shine: 0, lip: 1.1,
  drop: 'soft', outline: 0, ink: '#1A1030', radius: 1, label: 'edge', render: 'three', material: 'plastic',
};
