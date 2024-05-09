import { Box, Button } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { Page } from '@/widgets/Page';
import { ItemsTable } from '@/features/ItemsTable';
import { getRouteCreateUser } from '@/shared/consts/router.ts';
import { SearchInput } from '@/shared/ui/SearchInput';

function ItemsPage() {
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
      <ItemsTable />
    </Page>
  );
}

export default memo(ItemsPage);
