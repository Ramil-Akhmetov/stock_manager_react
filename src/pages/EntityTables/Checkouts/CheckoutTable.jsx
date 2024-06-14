import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const checkoutColumns = [
  {
    name: 'created_at',
    label: 'Дата',
    isSort: true,
    format: (row) => (
      <>{new Date(row.created_at).toLocaleDateString() || '-'}</>
    ),
  },
  {
    name: 'note',
    label: 'Описание',
    isSort: true,
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
];

export function CheckoutTable() {
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
        <Button variant="contained" color="primary" href="/checkouts/create">
          Add Checkout
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="checkouts"
        title="Checkouts"
        columns={checkoutColumns}
        dataFetchQuery={mainApi.useGetCheckoutsQuery}
        search={search}
      />
    </Page>
  );
}
