export const asyncExportTemplate = (componentName) => {
  return `import { lazy } from 'react';

export const ${componentName}Async = lazy(() => import('./${componentName}.tsx'));
`;
};
