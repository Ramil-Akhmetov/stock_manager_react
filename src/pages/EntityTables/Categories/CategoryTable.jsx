import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const categoryColumns = [
  {
    name: 'name',
    label: 'Название',
    isSort: true,
  },
];

export function CategoryTable() {
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
        <Button variant="contained" color="primary" href="/categories/create">
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="categories"
        title="Категории"
        columns={categoryColumns}
        dataFetchQuery={mainApi.useGetCategoriesQuery}
        search={search}
      />
    </Page>
  );
}
