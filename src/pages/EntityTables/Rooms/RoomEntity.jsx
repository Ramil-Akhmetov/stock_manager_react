import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography,
  Modal,
  Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage/index.ts';
import { Page } from '@/widgets/Page/index.ts';
import { getUserAuthData } from '@/entities/User/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';

export const RoomEntityTable = memo(() => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const authData = useSelector(getUserAuthData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`${__API__}/rooms/${roomId}`, {
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
            setRoom(null);
          } else {
            throw new Error('Ошибка при получении данных');
          }
        } else {
          const data = await response.json();
          setRoom(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirm = async () => {
    setModalOpen(false);
    setLoading(true);
    try {
      const response = await fetch(`${__API__}/rooms/${roomId}`, {
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
        throw new Error('Ошибка при удалении помещения');
      }
      enqueueSnackbar('Помещение успешно удалено', { variant: 'success' });
      navigate('/rooms');
    } catch (err) {
      setError(err.message);
      enqueueSnackbar('Ошибка при удалении помещения', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (room == null) {
    return <ErrorPage message="Страница не найдена" statusCode={404} />;
  }

  return (
    <Page>
      {room && (
        <>
          <TableContainer
            component={Paper}
            style={{ width: '50%', margin: 'auto' }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Номер</TableCell>
                  <TableCell>{room.number || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>{room.name || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Тип помещения</TableCell>
                  <TableCell>{room.room_type?.name || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ответственное лицо</TableCell>
                  <TableCell>{`${room.user?.surname || ''} ${
                    room.user?.name || ''
                  } ${room.user?.patronymic || ''}`}</TableCell>
                </TableRow>
                {room.racks && room.racks.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="h6">Стелажи</Typography>
                      </TableCell>
                    </TableRow>
                    {room.racks.map((rack, index) => (
                      <TableRow key={index}>
                        <TableCell>Стелаж {index + 1}</TableCell>
                        <TableCell>{rack.name}</TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                {isAdmin && (
                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/rooms/${roomId}/edit`}
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
                Подтвердить удаление помещения
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Вы уверены, что хотите удалить это помещение?
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
