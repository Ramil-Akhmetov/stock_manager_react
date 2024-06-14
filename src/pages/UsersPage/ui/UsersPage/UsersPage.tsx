import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { Page } from '@/widgets/Page';
import { UsersTable } from '@/features/UsersTable';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { getRouteCreateUser } from '@/shared/consts/router.ts';
import { SearchInput } from '@/shared/ui/SearchInput';

const allRolesOptions = {
  id: '',
  name: 'Все помещения',
};
function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(allRolesOptions);

  useEffect(() => {
    console.log(selectedRole);
  }, []);

  const onSearch = useCallback(
    (s: string) => {
      setSearch(s);
    },
    [setSearch]
  );

  useEffect(() => {
    const fetchRoleOptions = async () => {
      try {
        const response = await fetch(`${__API__}/roles`, {
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
          setRoleOptions([allRolesOptions, ...data.data]);
        } else {
          throw new Error('Ошибка при получении статусов');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoleOptions();
  }, []);

  const handleRoleChange = (event: any, newValue) => {
    setSelectedRole(newValue);
  };

  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}>
        <FormControl margin="normal" sx={{ minWidth: 200, m: 0 }}>
          <Autocomplete
            options={roleOptions}
            getOptionLabel={(option) =>
              option.id === '' ? 'Все роли' : `${option.name}`
            }
            value={selectedRole}
            onChange={handleRoleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Роль"
                variant="outlined"
                size="small"
              />
            )}
          />
        </FormControl>
        <Button variant="contained" color="primary" href={getRouteCreateUser()}>
          Добавить
        </Button>
        <SearchInput onSearch={onSearch} />
      </Box>
      <UsersTable
        search={search}
        params={{
          room_id: selectedRole.id,
        }}
      />
    </Page>
  );
}

export default memo(UsersPage);
