import fs from 'fs/promises';
import { firstCharUpperCase } from '../firstCharUpperCase.js';
import { resolveRoot } from '../resolveRoot.js';
import { createModel } from './createModel.js';
import { createPublicApi } from './createPublicApi.js';
import { createUI } from './createUI.js';

export const createTemplate = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot('src', layer, firstCharUpperCase(sliceName)));
  } catch (e) {
    console.log(`Failed to create directory for slice ${sliceName}`);
  }

  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
