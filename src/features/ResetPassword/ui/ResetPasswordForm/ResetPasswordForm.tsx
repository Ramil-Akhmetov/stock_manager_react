import {
  Alert,
  Box,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  FormEvent,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import {
  resetPasswordActions,
  resetPasswordReducer,
} from '../../model/slice/resetPasswordSlice.ts';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer.ts';
import {
  getNewPassword,
  getNewPasswordConfirmation,
  getOldPassword,
} from '../../model/selectors/resetPasswordSelectors.ts';
import { useResetPassword } from '../../api/resetPasswordApi.ts';
import { isErrorResponse } from '@/shared/types/errorResponse.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton';

const reducers: ReducerList = {
  resetPassword: resetPasswordReducer,
};

const ResetPasswordForm = memo(() => {
  useAsyncReducer({ reducers });
  const [isStackbarOpen, setIsStackbarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const old_password = useSelector(getOldPassword);
  const new_password = useSelector(getNewPassword);
  const new_password_confirmation = useSelector(getNewPasswordConfirmation);
  const [resetPassword, { isLoading, isError, error, data, isSuccess }] =
    useResetPassword();

  useEffect(() => {
    setIsStackbarOpen(isSuccess || isError);
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetPasswordActions.setOldPassword(''));
      dispatch(resetPasswordActions.setNewPassword(''));
      dispatch(resetPasswordActions.setNewPasswordConfirmation(''));
    }
  }, [isSuccess, dispatch]);

  const onCloseStackbar = useCallback(
    (evt: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsStackbarOpen(false);
    },
    []
  );

  const onChangeOldPassword = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(resetPasswordActions.setOldPassword(evt.target.value));
    },
    [dispatch]
  );

  const onChangeNewPassword = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(resetPasswordActions.setNewPassword(evt.target.value));
    },
    [dispatch]
  );

  const onChangeNewPasswordConfirmation = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        resetPasswordActions.setNewPasswordConfirmation(evt.target.value)
      );
    },
    [dispatch]
  );

  const onResetPassword = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      await resetPassword({
        old_password,
        new_password,
        new_password_confirmation,
      });
    },
    [resetPassword, old_password, new_password, new_password_confirmation]
  );
  return (
    <Box>
      <Snackbar
        open={isStackbarOpen}
        autoHideDuration={6000}
        onClose={onCloseStackbar}
      >
        <Alert
          onClose={onCloseStackbar}
          severity={isError ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {/* todo maybe error */}
          {isError && isErrorResponse(error)
            ? error?.data.message
            : data?.message}
        </Alert>
      </Snackbar>
      <Grid container spacing={2} component="form" onSubmit={onResetPassword}>
        <Grid item xs={12}>
          <Typography variant="h4">Изменить пароль</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Текущий пароль"
            fullWidth
            variant="outlined"
            type="password"
            required
            value={old_password}
            onChange={onChangeOldPassword}
            error={
              isErrorResponse(error)
                ? Boolean(error.data.errors?.old_password)
                : false
            }
            helperText={
              isErrorResponse(error) ? error.data.errors?.old_password : null
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Новый пароль"
            fullWidth
            variant="outlined"
            type="password"
            required
            value={new_password}
            onChange={onChangeNewPassword}
            error={
              isErrorResponse(error)
                ? Boolean(error.data.errors?.new_password)
                : false
            }
            helperText={
              isErrorResponse(error) ? error.data.errors?.new_password : null
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Новый пароль"
            fullWidth
            variant="outlined"
            type="password"
            required
            value={new_password_confirmation}
            onChange={onChangeNewPasswordConfirmation}
            error={
              isErrorResponse(error)
                ? Boolean(error.data.errors?.new_password_confirmed)
                : false
            }
            helperText={
              isErrorResponse(error)
                ? error.data.errors?.new_password_confirmed
                : null
            }
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Изменить пароль
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
});

export default ResetPasswordForm;
