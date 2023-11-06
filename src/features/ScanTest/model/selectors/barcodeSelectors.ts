import { StateSchema } from '@/app/providers/StoreProvider';

export const getBarcode = (state: StateSchema) =>
  state?.barcodeForm?.barcode || '';
