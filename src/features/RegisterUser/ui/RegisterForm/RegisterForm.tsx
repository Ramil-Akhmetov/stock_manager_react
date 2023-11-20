import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Alert, Avatar, Box, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, FormEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initAuthData } from '@/entities/User';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { getRouteMain } from '@/shared/consts/router.ts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer';
import { isErrorResponse } from '@/shared/types/errorResponse.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton';
import { useRegisterUser } from '../../api/registerUserApi.ts';
import {
  getRegisterEmail,
  getRegisterInviteCode,
  getRegisterPassword,
  getRegisterPasswordConfirmation,
} from '../../model/selectors/selectors.ts';
import {
  registerUserActions,
  registerUserReducer,
} from '../../model/slices/RegisterUserSlice.ts';

const reducers: ReducerList = {
  registerUser: registerUserReducer,
};

const RegisterUser = memo(() => {
  useAsyncReducer({ reducers });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useSelector(getRegisterEmail);
  const invite_code = useSelector(getRegisterInviteCode);
  const password = useSelector(getRegisterPassword);
  const password_confirmation = useSelector(getRegisterPasswordConfirmation);
  const [registerUser, { isLoading, error }] = useRegisterUser();

  const onRegister = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      try {
        const response = await registerUser({
          invite_code,
          email,
          password,
          password_confirmation,
        }).unwrap();

        localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, response.token);
        dispatch(initAuthData());
        navigate(getRouteMain());
        enqueueSnackbar('Вы успешно зарегистрировались в системе', {
          variant: 'success',
        });
      } catch (e) {
        if (isErrorResponse(e)) {
          enqueueSnackbar(e.data.message, { variant: 'error' });
        }
      }
    },
    [
      registerUser,
      invite_code,
      email,
      password,
      password_confirmation,
      dispatch,
      navigate,
      enqueueSnackbar,
    ]
  );

  const onChangeInviteCode = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(registerUserActions.setInviteCode(evt.target.value));
    },
    [dispatch]
  );

  const onChangeEmail = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(registerUserActions.setEmail(evt.target.value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(registerUserActions.setPassword(evt.target.value));
    },
    [dispatch]
  );

  const onChangePasswordConfirmation = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(registerUserActions.setPasswordConfirmation(evt.target.value));
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <PersonAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Box component="form" onSubmit={onRegister} sx={{ mt: 1 }}>
        {isErrorResponse(error) && (
          <Alert severity="error" variant="outlined">
            {error.data.message}
          </Alert>
        )}
        <TextField
          margin="normal"
          fullWidth
          label="Код приглашения"
          type="text"
          autoFocus
          required
          value={invite_code}
          onChange={onChangeInviteCode}
          error={isErrorResponse(error) && !!error.data.errors?.invite_code}
          helperText={isErrorResponse(error) && error.data.errors?.invite_code}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          required
          value={email}
          onChange={onChangeEmail}
          error={isErrorResponse(error) && !!error.data.errors?.email}
          helperText={isErrorResponse(error) && error.data.errors?.email}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          required
          value={password}
          onChange={onChangePassword}
          error={isErrorResponse(error) && !!error.data.errors?.password}
          helperText={isErrorResponse(error) && error.data.errors?.password}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Подтверждение пароля"
          type="password"
          required
          value={password_confirmation}
          onChange={onChangePasswordConfirmation}
          error={
            isErrorResponse(error) && !!error.data.errors?.password_confirmation
          }
          helperText={
            isErrorResponse(error) && error.data.errors?.password_confirmation
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Регистрация
        </LoadingButton>
      </Box>
    </Box>
  );
});

export default RegisterUser;
