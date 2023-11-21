import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Box, Link, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, FormEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { initAuthData } from '@/entities/User';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { getRouteMain } from '@/shared/consts/router.ts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer.ts';
import { isErrorResponse } from '@/shared/types/errorResponse.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton';
import { useLoginUser } from '../../api/loginUserApi.ts';
import {
  getLoginEmail,
  getLoginPassword,
} from '../../model/selectors/loginUserSelectors.ts';
import { loginActions, loginReducer } from '../../model/slice/loginSlice.ts';

const reducers: ReducerList = {
  loginForm: loginReducer,
};

const LoginForm = memo(() => {
  useAsyncReducer({ reducers });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useSelector(getLoginEmail);
  const password = useSelector(getLoginPassword);
  const [loginUser, { isLoading, error }] = useLoginUser();
  const onLogin = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      try {
        const response = await loginUser({ email, password }).unwrap();
        localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, response.token);

        dispatch(initAuthData());
        navigate(getRouteMain());
        enqueueSnackbar('Вы успешно вошли в систему', { variant: 'success' });
      } catch (e) {
        if (isErrorResponse(e)) {
          enqueueSnackbar(e.data.message, { variant: 'error' });
        }
      }
    },
    [loginUser, email, password, dispatch, navigate, enqueueSnackbar]
  );

  const onChangeEmail = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(loginActions.setEmail(evt.target.value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(loginActions.setPassword(evt.target.value));
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <Box component="form" onSubmit={onLogin} sx={{ mt: 1 }}>
        {isErrorResponse(error) && (
          <Alert severity="error" variant="outlined">
            {error.data.message}
          </Alert>
        )}
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          autoFocus
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
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Войти
        </LoadingButton>
        <Link to="/" variant="body2" component={RouterLink}>
          Забыли пароль?
        </Link>
      </Box>
    </Box>
  );
});

export default LoginForm;
