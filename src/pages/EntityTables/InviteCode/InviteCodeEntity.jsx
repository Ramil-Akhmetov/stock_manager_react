import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage/index.ts';
import { Page } from '@/widgets/Page/index.ts';
import { getUserAuthData } from '@/entities/User/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';

export const InviteCodeEntity = memo(() => {
  const navigate = useNavigate();
  const { id: inviteId } = useParams();
  const authData = useSelector(getUserAuthData);
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const response = await fetch(`${__API__}/invite_codes/${inviteId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            setInvite(null);
          } else {
            throw new Error('Ошибка при получении данных');
          }
        } else {
          const data = await response.json();
          setInvite(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [inviteId]);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить пригласительный код?'
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(`${__API__}/invite_codes/${inviteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_ACCESS_KEY
          )}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении пригласительного кода');
      }
      enqueueSnackbar('Пригласительный код успешно удален', {
        variant: 'success',
      });
      navigate('/invite_codes');
    } catch (err) {
      setError(err.message);
      enqueueSnackbar('Ошибка при удалении пригласительного кода', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (invite == null) {
    return <ErrorPage message="Страница не найдена" statusCode={404} />;
  }

  return (
    <Page>
      {invite && (
        <TableContainer
          component={Paper}
          style={{ width: '50%', margin: 'auto' }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Фамилия</TableCell>
                <TableCell>{invite?.user?.surname || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>{invite?.user?.name || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Отчество</TableCell>
                <TableCell>{invite?.user?.patronymic || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Код</TableCell>
                <TableCell>{invite.code || '-'}</TableCell>
              </TableRow>
              {isAdmin && (
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Page>
  );
});
