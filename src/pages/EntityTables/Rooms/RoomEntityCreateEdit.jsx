import {
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton/index.ts';

function RoomEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const [room, setRoom] = useState({
    name: '',
    number: '',
    user_id: '',
    room_type_id: '',
    racks: [
      // {
      //   name: '',
      //   number: '',
      // },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!roomId);
  const [users, setUsers] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (roomId) {
      setLoading(true);
      const fetchRoom = async () => {
        try {
          const response = await fetch(`${__API__}/rooms/${roomId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem(
                LOCAL_STORAGE_ACCESS_KEY
              )}`,
              Accept: 'application/json',
            },
          });
          const res = await response.json();
          setRoom({
            name: res.data.name || '',
            number: res.data.number || '',
            user_id: res.data.user_id || '',
            room_type_id: res.data.room_type_id || '',
            racks: res.data.racks || [{ name: '', number: '' }],
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRoom();
    }
  }, [roomId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${__API__}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setUsers(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${__API__}/room_types`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setRoomTypes(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
    fetchRoomTypes();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
  }, []);

  const handleRackChange = (index, e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => {
      const racks = [...prevRoom.racks];
      racks[index] = { ...racks[index], [name]: value };
      return { ...prevRoom, racks };
    });
  };

  const handleAddRack = () => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      racks: [...prevRoom.racks, { name: '', number: '' }],
    }));
  };

  const handleRemoveRack = (index) => {
    setRoom((prevRoom) => {
      const racks = [...prevRoom.racks];
      racks.splice(index, 1);
      return { ...prevRoom, racks };
    });
  };

  useEffect(() => {
    if (room.room_type_id === 1 && room.racks.length === 0) {
      setRoom((prevRoom) => ({
        ...prevRoom,
        racks: [{ name: '', number: '' }],
      }));
    }
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        isEditing ? `${__API__}/rooms/${roomId}` : `${__API__}/rooms`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(room),
        }
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          `Помещение ${isEditing ? 'обновлено' : 'создано'} успешно`,
          {
            variant: 'success',
          }
        );
        navigate(`/rooms/${data.data.id}`);
      } else {
        setError(data);
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    } catch (err) {
      setError(err);
      enqueueSnackbar(err.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container
        component={Paper}
        style={{ padding: '20px', maxWidth: '600px', marginTop: '20px' }}
      >
        <Typography variant="h5" gutterBottom>
          {isEditing ? 'Редактировать помещение' : 'Создать помещение'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Номер"
            name="number"
            value={room.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.number}
            helperText={error?.errors?.number}
          />
          <TextField
            label="Название"
            name="name"
            value={room.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.name}
            helperText={error?.errors?.name}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-label">Ответственное лицо</InputLabel>
            <Select
              labelId="user-label"
              name="user_id"
              value={room.user_id}
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.surname} {user.name} {user.patronymic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="room-type-label">Тип помещения</InputLabel>
            <Select
              labelId="room-type-label"
              name="room_type_id"
              value={room.room_type_id}
              onChange={handleChange}
            >
              {roomTypes.map((roomType) => (
                <MenuItem key={roomType.id} value={roomType.id}>
                  {roomType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {room.room_type_id === 1 && (
            <>
              <Typography variant="h6" gutterBottom>
                Стелажи
              </Typography>
              {room.racks.map((rack, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  style={{ marginBottom: '10px' }}
                >
                  <Grid item xs={12} sm={10}>
                    <TextField
                      label="Название"
                      name="name"
                      value={rack.name}
                      onChange={(e) => handleRackChange(index, e)}
                      fullWidth
                      margin="normal"
                      error={!!error?.errors?.[`racks.${index}.name`]}
                      helperText={error?.errors?.[`racks.${index}.name`]}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'end',
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveRack(index)}
                    >
                      Удалить
                    </Button>
                  </Grid>
                  {/* <Grid */}
                  {/*  item */}
                  {/*  xs={12} */}
                  {/*  sm={12} */}
                  {/*  style={{ display: 'flex', justifyContent: 'flex-end' }} */}
                  {/* > */}
                  {/* </Grid> */}
                </Grid>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" onClick={handleAddRack}>
                  Добавить стелаж
                </Button>
              </Box>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              {isEditing ? 'Сохранить изменения' : 'Создать'}
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </Page>
  );
}

export default RoomEntityCreateEdit;
