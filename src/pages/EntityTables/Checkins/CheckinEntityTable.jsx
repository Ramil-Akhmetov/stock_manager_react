import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage/index.ts';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';

const itemColumns = [
  {
    name: 'code',
    label: 'Код',
    isSort: true,
  },
  {
    name: 'name',
    label: 'Наименование',
    isSort: true,
  },
  {
    name: 'quantity',
    label: 'Количество',
    isSort: true,
  },
  {
    name: 'unit',
    label: 'Единица измерения',
    isSort: true,
  },
  {
    name: 'category_id',
    label: 'Категория',
    isSort: true,
    format: (row) => <>{row?.category?.name || '-'}</>,
  },
  {
    name: 'type_id',
    label: 'Тип',
    isSort: true,
    format: (row) => <>{row?.type?.name || '-'}</>,
  },
  {
    name: 'rack_id',
    label: 'Стелаж',
    isSort: true,
    format: (row) => <>{row?.rack?.name || '-'}</>,
  },
];
export const CheckinEntityTable = memo(() => {
  const { id: checkinId } = useParams();
  const [checkin, setCheckin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    console.log(checkin);
  }, [checkin]);

  useEffect(() => {
    const fetchCheckin = async () => {
      try {
        const response = await fetch(`${__API__}/checkins/${checkinId}`, {
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
            setCheckin(null);
          } else {
            throw new Error('Ошибка при получении данных');
          }
        } else {
          const data = await response.json();
          console.log(data);
          setCheckin(data.data);
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar('Ошибка при загрузке данных', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCheckin();
  }, [checkinId, enqueueSnackbar]);

  if (loading) {
    return null; // Render loading indicator or placeholder
  }

  if (!checkin) {
    return (
      <ErrorPage message="Страница не найдена" statusCode={404} /> // Render appropriate error message or redirect
    );
  }

  return (
    <Page>
      <TableContainer
        component={Paper}
        style={{ width: '60%', margin: 'auto' }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>
                {new Date(checkin.created_at).toLocaleDateString() || '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Примечание</TableCell>
              <TableCell>{checkin.note || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Помещение</TableCell>
              <TableCell>
                {checkin?.room?.room_type?.name} {checkin?.room?.number} -{' '}
                {checkin?.room?.name}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box>
          <DataTable
            api_prefix="items"
            title="Объекты"
            columns={itemColumns}
            dataFetchQuery={mainApi.useGetItemsQuery}
            params={{
              checkin_id: checkinId,
            }}
          />
        </Box>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} align="right" />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
});
