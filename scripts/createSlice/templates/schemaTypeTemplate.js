import { firstCharUpperCase } from '../firstCharUpperCase.js';

export const schemaTypeTemplate = (sliceName) =>
  `export interface ${firstCharUpperCase(sliceName)}Schema {}
`;
