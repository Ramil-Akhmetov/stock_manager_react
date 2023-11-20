import fs from 'fs/promises';
import { firstCharUpperCase } from '../firstCharUpperCase.js';
import { resolveRoot } from '../resolveRoot.js';
import { componentTemplate } from './componentTemplate.js';
import { asyncExportTemplate } from './createAsyncExport.js';

export const createUI = async (layer, sliceName) => {
  const resolveUIPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'ui', ...segments);

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log('Failed to create UI directory');
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);
      await fs.mkdir(resolveUIPath(componentName));
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName, layer)
      );
    } catch (e) {
      console.log('Failed to create component');
    }
  };

  const createAyncExport = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.async.tsx`),
        asyncExportTemplate(componentName)
      );
    } catch (e) {
      console.log('Failed to create component');
    }
  };

  await createUIDir();
  await createComponent();

  if (layer === 'pages') {
    await createAyncExport();
  }
};
