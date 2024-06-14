import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const roomColumns = [
  {
    name: 'room_type_id',
    label: 'Тип помещения',
    format: (row) => `${row?.room_type?.name || ''}`,
    isSort: true,
  },
  {
    name: 'number',
    label: 'Номер',
    isSort: true,
  },
  {
    name: 'name',
    label: 'Название',
    isSort: true,
  },
  {
    name: 'user',
    label: 'Ответственное лицо',
    format: (row) =>
      `${row?.user?.surname || ''} ${row?.user?.name || ''} ${
        row?.user?.patronymic || ''
      }`,
  },
];

export function RoomsTable() {
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
        <Button variant="contained" color="primary" href="/rooms/create">
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="rooms"
        title="Помещения"
        columns={roomColumns}
        dataFetchQuery={mainApi.useGetRoomsQuery}
        search={search}
      />
    </Page>
  );
}
