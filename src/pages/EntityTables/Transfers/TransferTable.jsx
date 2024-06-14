import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page/index.ts';
import { getUserAuthData } from '@/entities/User/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const transferColumns = [
  {
    name: 'created_at',
    label: 'Дата',
    isSort: true,
    format: (row) => (
      <>{new Date(row.created_at).toLocaleDateString() || '-'}</>
    ),
  },
  {
    name: 'from_room',
    label: 'Откуда',
    format: (row) =>
      `${row?.from_room?.room_type?.name} ${row?.from_room?.number} - ${row?.from_room?.name}`,
  },
  {
    name: 'to_room',
    label: 'Куда',
    format: (row) =>
      `${row?.to_room?.room_type?.name} ${row?.to_room?.number} - ${row?.to_room?.name}`,
  },
  {
    name: 'user.name',
    label: 'ФИО',
    format: (row) => (
      <>
        {row?.user?.surname} {row?.user?.name} {row?.user?.patronymic}
      </>
    ),
  },
  {
    name: 'status',
    label: 'Status',
    format: (row) => <>{row?.transfer_status?.name || '-'}</>,
  },
  {
    name: 'note',
    label: 'Описание',
    isSort: true,
  },
];

export function TransferTable() {
  const [search, setSearch] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const onSearch = useCallback(
    (s) => {
      setSearch(s);
    },
    [setSearch]
  );

  const authData = useSelector(getUserAuthData);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(authData?.roles[0].name === 'Администратор');
  }, [authData]);

  useEffect(() => {
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
        if (response.ok) {
          const data = await response.json();
          setStatusOptions(data.data);
        } else {
          throw new Error('Ошибка при получении статусов');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatusOptions();
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '1rem', mb: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
          <InputLabel id="status-select-label">Статус</InputLabel>
          <Select
            labelId="status-select-label"
            value={selectedStatus}
            onChange={handleStatusChange}
            label="Статус"
          >
            <MenuItem value="">Все</MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" href="/transfers/create">
          Создать
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="transfers"
        title="Перемещения"
        columns={transferColumns}
        dataFetchQuery={mainApi.useGetTransfersQuery}
        search={search}
        params={{
          transfer_status_id: selectedStatus,
          only_mines: !isAdmin,
        }}
      />
    </Page>
  );
}
