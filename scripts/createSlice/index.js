import { createTemplate } from './templates/createTemplate.js';

let layer = process.argv[2];
let sliceName = process.argv[3];

layer = layer[0].toLowerCase() + layer.slice(1);
sliceName = sliceName[0].toLowerCase() + sliceName.slice(1);

const layers = ['features', 'entities', 'pages', 'widgets'];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Specify the layer ${layers.join(' или ')}`);
}

if (!sliceName) {
  throw new Error('Specify the slice name');
}

createTemplate(layer, sliceName);
