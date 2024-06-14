import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage/index.ts';
import { Page } from '@/widgets/Page/index.ts';
import { getUserAuthData } from '@/entities/User/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';

export const CategoryEntityTable = memo(() => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const authData = useSelector(getUserAuthData);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${__API__}/categories/${categoryId}`, {
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
            setCategory(null);
          } else {
            throw new Error('Ошибка при получении данных');
          }
        } else {
          const data = await response.json();
          setCategory(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirm = async () => {
    setModalOpen(false);
    setLoading(true);
    try {
      const response = await fetch(`${__API__}/categories/${categoryId}`, {
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
        throw new Error('Ошибка при удалении категории');
      }
      enqueueSnackbar('Категория успешно удалена', { variant: 'success' });
      navigate('/categories');
    } catch (err) {
      setError(err.message);
      enqueueSnackbar('Ошибка при удалении категории', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (category == null) {
    return <ErrorPage message="Страница не найдена" statusCode={404} />;
  }

  return (
    <Page>
      {category && (
        <>
          <TableContainer
            component={Paper}
            style={{ width: '50%', margin: 'auto' }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>{category.name || '-'}</TableCell>
                </TableRow>
                {isAdmin && (
                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/categories/${categoryId}/edit`}
                        style={{ marginRight: '10px' }}
                      >
                        Редактировать
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleOpenModal}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2">
                Подтвердить удаление категории
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Вы уверены, что хотите удалить эту категорию?
              </Typography>
              <Box
                sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCloseModal}
                >
                  Отмена
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleConfirm}
                >
                  Подтвердить
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </Page>
  );
});
