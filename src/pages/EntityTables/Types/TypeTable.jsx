import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const typeColumns = [
  {
    name: 'name',
    label: 'Название',
    isSort: true,
  },
];

export function TypeTable() {
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
        <Button variant="contained" color="primary" href="/types/create">
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="types"
        title="Типы"
        columns={typeColumns}
        dataFetchQuery={mainApi.useGetTypesQuery}
        search={search}
      />
    </Page>
  );
}
