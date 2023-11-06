import fs from 'fs/promises';
import { resolveRoot } from '../resolveRoot.js';
import { firstCharUpperCase } from '../firstCharUpperCase.js';
import { componentTemplate } from './componentTemplate.js';

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
        componentTemplate(componentName)
      );
    } catch (e) {
      console.log('Failed to create component');
    }
  };

  await createUIDir();
  await createComponent();
};
