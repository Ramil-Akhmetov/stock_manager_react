import { Button, TextField } from '@mui/material';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import {
  barcodeActions,
  barcodeReducer,
} from '../../model/slice/barcodeSlice.ts';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer.ts';
import { getBarcode } from '../../model/selectors/barcodeSelectors.ts';
import { useResetPassword } from '../../api/resetPasswordApi.ts';

const reducers: ReducerList = {
  barcodeForm: barcodeReducer,
};

const ScanTestForm = memo(() => {
  useAsyncReducer({ reducers });
  const dispatch = useAppDispatch();
  const barcode = useSelector(getBarcode);

  // const [resetPassword, { isLoading, isError, error, data, isSuccess }] =
  //   useResetPassword();

  const onChangeBarcode = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(barcodeActions.setBarcode(evt.target.value));
    },
    [dispatch]
  );

  const onKeyDownBarcode = useCallback(
    (evt: KeyboardEvent<HTMLInputElement>) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
      }
    },
    [dispatch]
  );

  const onBarcodeSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      alert(barcode);
    },
    [barcode]
  );
  return (
    <form onSubmit={onBarcodeSubmit}>
      <TextField
        label="Barcode"
        variant="outlined"
        fullWidth
        value={barcode}
        onChange={onChangeBarcode}
        onKeyDown={onKeyDownBarcode}
      />
      <TextField label="test" variant="outlined" fullWidth />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
});

export default ScanTestForm;
