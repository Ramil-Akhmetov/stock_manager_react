import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { Page } from '@/widgets/Page/index.ts';
import { mainApi } from '@/shared/api/mainApi.ts';
import { DataTable } from '@/shared/ui/DataTable/index.ts';
import { SearchInput } from '@/shared/ui/SearchInput/index.ts';

const codeColumns = [
  {
    name: 'surname',
    label: 'Фамилия',
    format: (row) => <>{row?.user?.surname || '-'}</>,
  },
  {
    name: 'name',
    label: 'Имя',
    format: (row) => <>{row?.user?.name || '-'}</>,
  },
  {
    name: 'patronymic',
    label: 'Отчество',
    format: (row) => <>{row?.user?.patronymic || '-'}</>,
  },
  {
    name: 'code',
    label: 'Код',
    isSort: true,
  },
];
export function InviteCodesTable() {
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
        <SearchInput onSearch={onSearch} />
      </Box>
      <DataTable
        api_prefix="invite_codes"
        title="Коды приглашения"
        columns={codeColumns}
        dataFetchQuery={mainApi.useGetInviteCodesQuery}
        search={search}
      />
    </Page>
  );
}
