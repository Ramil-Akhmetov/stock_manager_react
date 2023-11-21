import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from '@/entities/User';
import { getRouteLogin } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useLogoutUser } from '../api/logoutUserApi';

export const useLogout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] = useLogoutUser();

  const logout = useCallback(async () => {
    try {
      await logoutUser().unwrap();

      dispatch(userActions.logout());
      enqueueSnackbar('Вы успешно вышли из аккаунта', {
        variant: 'success',
      });
      navigate(getRouteLogin());
    } catch (e) {
      enqueueSnackbar('Произошла ошибка при выходе из аккаунта', {
        variant: 'error',
      });
    }
  }, [dispatch, enqueueSnackbar, logoutUser, navigate]);

  return { logout, isLoading };
};
