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

export const CheckoutEntityTable = memo(() => {
  const navigate = useNavigate();
  const { id: checkoutId } = useParams();
  const authData = useSelector(getUserAuthData);
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const response = await fetch(`${__API__}/checkouts/${checkoutId}`, {
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
            setCheckout(null);
          } else {
            throw new Error('Ошибка при получении данных');
          }
        } else {
          const data = await response.json();
          setCheckout(data.data);
          console.log(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfer();
  }, [checkoutId]);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  if (loading) {
    return null;
  }

  if (checkout == null) {
    return <ErrorPage message="Страница не найдена" statusCode={404} />;
  }

  return (
    <Page>
      {checkout && (
        <TableContainer
          component={Paper}
          style={{ width: '80%', margin: 'auto' }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>
                  {new Date(checkout.created_at).toLocaleDateString() || '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>
                  {checkout.user
                    ? `${checkout.user.surname} ${checkout.user.name} ${checkout.user.patronymic}`
                    : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Откуда</TableCell>
                <TableCell>
                  {checkout.room?.room_type?.name} {checkout.room?.number} -{' '}
                  {checkout.from_room?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Описание</TableCell>
                <TableCell>{checkout.note || '-'}</TableCell>
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
                      </TableRow>
                      {checkout.items.length > 0
                        ? checkout.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.code}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.pivot.newCode || '-'}</TableCell>
                              <TableCell>{item.pivot.quantity}</TableCell>
                              <TableCell>
                                {item.pivot.fullCheckout ? 'Да' : 'Нет'}
                              </TableCell>
                              <TableCell>
                                {item.pivot.rack?.name || '-'}
                              </TableCell>
                            </TableRow>
                          ))
                        : '-'}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Page>
  );
});
