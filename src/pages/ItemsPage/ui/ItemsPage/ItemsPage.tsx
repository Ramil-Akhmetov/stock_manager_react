import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { Page } from '@/widgets/Page';
import { ItemsTable } from '@/features/ItemsTable';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage';
import { getRouteCreateUser } from '@/shared/consts/router';
import { SearchInput } from '@/shared/ui/SearchInput';

interface RoomOption {
  id: string;
  name: string;
  number: string;
  room_type: {
    name: string;
  };
}

const allRoomsOption: RoomOption = {
  id: '',
  name: 'Все помещения',
  number: '',
  room_type: {
    name: '',
  },
};

function ItemsPage() {
  const [search, setSearch] = useState('');
  const [roomOptions, setRoomOptions] = useState<RoomOption[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(
    allRoomsOption
  );

  const onSearch = useCallback((s: string) => {
    setSearch(s);
  }, []);

  useEffect(() => {
    const fetchRoomOptions = async () => {
      try {
        const response = await fetch(`${__API__}/rooms?only_mines=true`, {
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
          setRoomOptions([allRoomsOption, ...data.data]);
        } else {
          throw new Error('Ошибка при получении статусов');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomOptions();
  }, []);

  const handleRoomChange = (event: any, newValue: RoomOption | null) => {
    setSelectedRoom(newValue);
  };

  return (
    <Page>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: '1rem',
          mb: 2,
          alignItems: 'center',
        }}
      >
        <FormControl margin="normal" sx={{ minWidth: 200, m: 0 }}>
          <Autocomplete
            options={roomOptions}
            getOptionLabel={(option) =>
              option.id === ''
                ? 'Все помещения'
                : `${option.room_type.name}: ${option.number} - ${option.name}`
            }
            value={selectedRoom}
            onChange={handleRoomChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Помещение"
                variant="outlined"
                size="small"
              />
            )}
          />
        </FormControl>
        <SearchInput onSearch={onSearch} />
      </Box>
      <ItemsTable
        search={search}
        params={{
          room_id: selectedRoom?.id,
          only_mines: 1,
        }}
      />
    </Page>
  );
}

export default memo(ItemsPage);
