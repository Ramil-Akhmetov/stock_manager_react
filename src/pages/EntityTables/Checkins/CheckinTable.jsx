import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const checkinColumns = [
  {
    name: 'created_at',
    label: 'Дата',
    isSort: true,
    format: (row) => (
      <>{new Date(row.created_at).toLocaleDateString() || '-'}</>
    ),
  },
  {
    name: 'supplier',
    label: 'Поставщик',
    format: (row) => <>{row?.supplier?.company || '-'}</>,
  },
  {
    name: 'user',
    label: 'Пользователь',
    format: (row) =>
      `${row?.user?.surname || ''} ${row?.user?.name || ''} ${
        row?.user?.patronymic || ''
      }`,
  },
  {
    name: 'room',
    label: 'Помещение',
    format: (row) =>
      `${row?.room?.room_type?.name} ${row?.room?.number} - ${row?.room?.name}`,
  },
  { name: 'note', label: 'Примечание', isSort: true },
];

export function CheckinTable() {
  const [search, setSearch] = useState('');

  const onSearch = useCallback(
    (s) => {
      setSearch(s);
    },
    [setSearch]
  );

  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}>
        <Button variant="contained" color="primary" href="/checkins/create">
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="checkins"
        title="Поступления"
        columns={checkinColumns}
        dataFetchQuery={mainApi.useGetCheckinsQuery}
        search={search}
      />
    </Page>
  );
}
