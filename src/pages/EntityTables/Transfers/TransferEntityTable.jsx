import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage/index.ts';
import { Page } from '@/widgets/Page/index.ts';
import { getUserAuthData } from '@/entities/User/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';

export const TransferEntityTable = memo(() => {
  const navigate = useNavigate();
  const { id: transferId } = useParams();
  const authData = useSelector(getUserAuthData);
  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const response = await fetch(`${__API__}/transfers/${transferId}`, {
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
            setTransfer(null);
          } else {
            throw new Error('Ошибка при получении данных');
          }
        } else {
          const data = await response.json();
          setTransfer(data.data);
          console.log(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchStatusOptions = async () => {
      try {
        const response = await fetch(`${__API__}/transfer_statuses`, {
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
          throw new Error('Ошибка при получении статусов');
        } else {
          const data = await response.json();
          setStatusOptions(data.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransfer();
    fetchStatusOptions();
  }, [transferId]);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleChangeStatus = async (statusId) => {
    try {
      const response = await fetch(
        `${__API__}/transfers/${transferId}/change_status`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify({ transfer_status_id: statusId }),
        }
      );
      const data = await response.json();

      setTransfer(data.data);

      enqueueSnackbar('Статус перевода успешно изменен', {
        variant: 'success',
      });
      handlePopoverClose();
    } catch (err) {
      setError(err.message);
      enqueueSnackbar('Ошибка при изменении статуса перевода', {
        variant: 'error',
      });
    }
  };

  if (loading) {
    return null;
  }

  if (transfer == null) {
    return <ErrorPage message="Страница не найдена" statusCode={404} />;
  }

  return (
    <Page>
      {transfer && (
        <TableContainer
          component={Paper}
          style={{ width: '80%', margin: 'auto' }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>
                  {new Date(transfer.created_at).toLocaleDateString() || '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>
                  {transfer.user
                    ? `${transfer.user.surname} ${transfer.user.name} ${transfer.user.patronymic}`
                    : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Причина</TableCell>
                <TableCell>{transfer.reason || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Статус</TableCell>
                <TableCell>{transfer.transfer_status?.name || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Откуда</TableCell>
                <TableCell>
                  {transfer.from_room?.room_type?.name}{' '}
                  {transfer.from_room?.number} - {transfer.from_room?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Куда</TableCell>
                <TableCell>
                  {transfer.to_room?.room_type?.name} {transfer.to_room?.number}{' '}
                  - {transfer.to_room?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Код</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Новый код</TableCell>
                        <TableCell>Количество</TableCell>
                        <TableCell>Полный перевод</TableCell>
                        <TableCell>Откуда (Стелаж)</TableCell>
                        <TableCell>Куда (Стелаж)</TableCell>
                      </TableRow>
                      {transfer.items.length > 0
                        ? transfer.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.code}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.pivot.newCode || '-'}</TableCell>
                              <TableCell>{item.pivot.quantity}</TableCell>
                              <TableCell>
                                {item.pivot.fullTransfer ? 'Да' : 'Нет'}
                              </TableCell>
                              <TableCell>
                                {item.pivot.fromRack?.name || '-'}
                              </TableCell>
                              <TableCell>
                                {item.pivot.toRack?.name || '-'}
                              </TableCell>
                            </TableRow>
                          ))
                        : '-'}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
              {isAdmin && (
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    {transfer.transfer_status_id == 1 && (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handlePopoverOpen}
                          style={{ marginRight: '10px' }}
                        >
                          Изменить статус
                        </Button>
                        <Popover
                          open={Boolean(popoverAnchor)}
                          anchorEl={popoverAnchor}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        >
                          <List>
                            {statusOptions.map((status) => (
                              <>
                                {status.id !== 1 && (
                                  <ListItem key={status.id} disableGutters>
                                    <ListItemButton
                                      onClick={() =>
                                        handleChangeStatus(status.id)
                                      }
                                    >
                                      <ListItemText primary={status.name} />
                                    </ListItemButton>
                                  </ListItem>
                                )}
                              </>
                            ))}
                          </List>
                        </Popover>
                      </>
                    )}
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
