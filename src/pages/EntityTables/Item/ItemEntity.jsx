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
import JsBarcode from 'jsbarcode';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage/index.ts';
import { Page } from '@/widgets/Page/index.ts';
import { getUserAuthData } from '@/entities/User/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';

export const ItemEntityTable = memo(() => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();
  const authData = useSelector(getUserAuthData);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const barcodeRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  async function fetchItem() {
    try {
      const response = await fetch(`${__API__}/items/${itemId}`, {
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
          setItem(null);
        } else {
          throw new Error('Error fetching item data');
        }
      } else {
        const data = await response.json();
        setItem(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  const handleConfirm = async () => {
    try {
      const response = await fetch(`${__API__}/confirmations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_ACCESS_KEY
          )}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({ item_id: itemId }),
      });
      if (response.ok) {
        enqueueSnackbar('Объект подтвержден успешно', { variant: 'success' });
        handleCloseModal();
        await fetchItem();
      } else {
        throw new Error('Error confirming item');
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  useEffect(() => {
    if (item?.code && barcodeRef.current) {
      JsBarcode(barcodeRef.current, item.code, {
        format: 'CODE128',
        displayValue: true,
      });
    }
  }, [item]);

  if (loading) {
    return null;
  }

  if (item == null) {
    return <ErrorPage message="Страница не найдена" statusCode={404} />;
  }

  return (
    <Page>
      {item && (
        <TableContainer
          component={Paper}
          style={{ width: '50%', margin: 'auto' }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <svg ref={barcodeRef} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Дата последнего подтверждения</TableCell>
                <TableCell>
                  {item.last_confirmation?.created_at ? (
                    <>
                      {new Date(
                        item.last_confirmation?.created_at
                      ).toLocaleDateString()}
                    </>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>{item.name || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Количество</TableCell>
                <TableCell>{item.quantity || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Единица измерения</TableCell>
                <TableCell>{item.unit || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Категория</TableCell>
                <TableCell>{item.category?.name || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Помещение</TableCell>
                <TableCell>{`${item.room?.room_type?.name} ${item.room?.number} - ${item.room?.name}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ответственное лицо</TableCell>
                <TableCell>
                  {item.room?.user?.surname} {item.room?.user?.name}{' '}
                  {item.room?.user?.patronymic}
                </TableCell>
              </TableRow>
              {isAdmin && (
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/items/${itemId}/edit`}
                      style={{ marginRight: '10px' }}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleOpenModal}
                    >
                      Подтвердить наличие
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
            Подтвердить наличие объекта
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Вы уверены, что хотите подтвердить наличие этого объекта?
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              Отмена
            </Button>
            <Button variant="contained" color="success" onClick={handleConfirm}>
              Подтвердить
            </Button>
          </Box>
        </Box>
      </Modal>
    </Page>
  );
});
