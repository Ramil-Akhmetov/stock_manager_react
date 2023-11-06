import { createTemplate } from './templates/createTemplate.js';

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ['features', 'entities', 'pages', 'widgets'];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Specify the layer ${layers.join(' или ')}`);
}

if (!sliceName) {
  throw new Error('Specify the slice name');
}

createTemplate(layer, sliceName);
