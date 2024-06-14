import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const supplierColumns = [
  { name: 'surname', label: 'Фамилия', isSort: true },
  { name: 'name', label: 'Имя', isSort: true },
  { name: 'patronymic', label: 'Отчество', isSort: true },
  { name: 'phone', label: 'Телефон', isSort: true },
  { name: 'email', label: 'Email', isSort: true },
  { name: 'company', label: 'Компания', isSort: true },
];

export function SupplierTable() {
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
        <Button variant="contained" color="primary" href="/suppliers/create">
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="suppliers"
        title="Поставщики"
        columns={supplierColumns}
        dataFetchQuery={mainApi.useGetSuppliersQuery}
        search={search}
      />
    </Page>
  );
}
