import { Box, Grid, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, FormEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer.ts';
import { isErrorResponse } from '@/shared/types/errorResponse.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton';
import { useResetPassword } from '../../api/resetPasswordApi.ts';
import {
  getNewPassword,
  getNewPasswordConfirmation,
  getOldPassword,
} from '../../model/selectors/resetPasswordSelectors.ts';
import {
  resetPasswordActions,
  resetPasswordReducer,
} from '../../model/slice/resetPasswordSlice.ts';

const reducers: ReducerList = {
  resetPassword: resetPasswordReducer,
};

const ResetPasswordForm = memo(() => {
  useAsyncReducer({ reducers });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const old_password = useSelector(getOldPassword);
  const new_password = useSelector(getNewPassword);
  const new_password_confirmation = useSelector(getNewPasswordConfirmation);
  const [resetPassword, { isLoading, error }] = useResetPassword();

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
      try {
        const response = await resetPassword({
          old_password,
          new_password,
          new_password_confirmation,
        }).unwrap();

        dispatch(resetPasswordActions.setOldPassword(''));
        dispatch(resetPasswordActions.setNewPassword(''));
        dispatch(resetPasswordActions.setNewPasswordConfirmation(''));
        enqueueSnackbar(response.message, { variant: 'success' });
      } catch (e) {
        if (isErrorResponse(e)) {
          enqueueSnackbar(e.data.message, { variant: 'error' });
        }
      }
    },
    [
      resetPassword,
      old_password,
      new_password,
      new_password_confirmation,
      dispatch,
      enqueueSnackbar,
    ]
  );
  return (
    <Box>
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
            error={isErrorResponse(error) && !!error.data.errors?.old_password}
            helperText={
              isErrorResponse(error) && error.data.errors?.old_password
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
            error={isErrorResponse(error) && !!error.data.errors?.new_password}
            helperText={
              isErrorResponse(error) && error.data.errors?.new_password
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
              isErrorResponse(error) &&
              !!error.data.errors?.new_password_confirmation
            }
            helperText={
              isErrorResponse(error) &&
              error.data.errors?.new_password_confirmation
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
