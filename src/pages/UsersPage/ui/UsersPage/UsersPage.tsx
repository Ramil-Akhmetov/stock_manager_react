import { Box, Button } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { Page } from '@/widgets/Page';
import { UsersTable } from '@/features/UsersTable';
import { getRouteCreateUser } from '@/shared/consts/router.ts';
import { SearchInput } from '@/shared/ui/SearchInput';

function UsersPage() {
  const [search, setSearch] = useState('');

  const onSearch = useCallback(
    (s: string) => {
      setSearch(s);
    },
    [setSearch]
  );
  return (
    <Page>
      <Box
        component="form"
        sx={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}
      >
        <Button variant="contained" color="primary" href={getRouteCreateUser()}>
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <UsersTable search={search} />
    </Page>
  );
}

export default memo(UsersPage);
