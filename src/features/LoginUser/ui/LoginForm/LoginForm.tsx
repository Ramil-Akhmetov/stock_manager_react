import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect } from 'react';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useSelector(getLoginEmail);
  const password = useSelector(getLoginPassword);
  const [loginUser, { isLoading, error, data, isSuccess }] = useLoginUser();

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, data.token);
      dispatch(initAuthData());
      navigate(getRouteMain());
    }
  }, [dispatch, isSuccess, data, navigate]);

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

  const onLogin = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      await loginUser({ email, password });
    },
    [loginUser, email, password]
  );
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <Box component="form" onSubmit={onLogin} sx={{ mt: 1 }}>
          {error && isErrorResponse(error) && (
            <Typography color="red">{error.data.message}</Typography>
          )}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={onChangeEmail}
            error={
              isErrorResponse(error) ? Boolean(error.data.errors?.email) : false
            }
            helperText={
              isErrorResponse(error) ? error.data.errors?.email : null
            }
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            required
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            error={
              isErrorResponse(error)
                ? Boolean(error.data.errors?.password)
                : false
            }
            helperText={
              isErrorResponse(error) ? error.data.errors?.password : null
            }
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
    </Container>
  );
});

export default LoginForm;
