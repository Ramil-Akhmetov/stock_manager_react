import fs from 'fs/promises';
import { firstCharUpperCase } from '../firstCharUpperCase.js';
import { resolveRoot } from '../resolveRoot.js';

export const createPublicApi = async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName);
  const schemaName = `${sliceName}Schema`;

  try {
    if (layer === 'widgets') {
      await fs.writeFile(
        resolveRoot('src', layer, sliceName, 'index.ts'),
        `export { ${componentName} } from './ui/${componentName}/${componentName}';
`
      );
    } else {
      await fs.writeFile(
        resolveRoot('src', layer, sliceName, 'index.ts'),
        `export { ${componentName} } from './ui/${componentName}/${componentName}';
export type { ${firstCharUpperCase(
          schemaName
        )} } from './model/types/${schemaName}';
`
      );
    }
  } catch (e) {
    console.log('Failed to create public api');
  }
};
