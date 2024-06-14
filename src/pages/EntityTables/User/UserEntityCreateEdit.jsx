import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Avatar,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { MuiTelInput } from 'mui-tel-input';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton/index.ts';

function UserEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    photo: '',
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!userId);
  const [photoFile, setPhotoFile] = useState(null);
  const [roles, setRoles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      const fetchUser = async () => {
        try {
          const response = await fetch(`${__API__}/users/${userId}`, {
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
          setUser(res.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    const fetchRoles = async () => {
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
        const data = await response.json();
        setRoles(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }, []);

  const handleFileChange = (file) => {
    setPhotoFile(file);
    setUser((prevUser) => ({
      ...prevUser,
      photo: URL.createObjectURL(file),
    }));
  };

  const handleRoleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      roles: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('surname', user.surname);
      formData.append('patronymic', user.patronymic);
      formData.append('phone', user.phone);
      formData.append('email', user.email);
      formData.append('roles', JSON.stringify(user.roles));
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await fetch(
        `${__API__}/users/${isEditing ? userId : ''}`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        enqueueSnackbar(
          `Пользователь ${isEditing ? 'обновлен' : 'создан'} успешно`,
          {
            variant: 'success',
          }
        );
        navigate(`/users/${data.data.id}`);
      } else {
        setError(data);
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    } catch (err) {
      console.log(err);
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
          {isEditing ? 'Редактировать пользователя' : 'Создать пользователя'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        {user.photo && (
          <Avatar
            src={user.photo}
            sx={{ width: 50, height: 50, margin: '10px auto' }}
          />
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.name}
            helperText={error?.errors?.name}
          />
          <TextField
            label="Фамилия"
            name="surname"
            value={user.surname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.surname}
            helperText={error?.errors?.surname}
          />
          <TextField
            label="Отчество"
            name="patronymic"
            value={user.patronymic}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.patronymic}
            helperText={error?.errors?.patronymic}
          />
          <TextField
            label="Телефон"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.phone}
            helperText={error?.errors?.phone}
          />
          <TextField
            label="Эл. почта"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.email}
            helperText={error?.errors?.email}
          />
          <MuiFileInput
            margin="normal"
            fullWidth
            label="Фото"
            value={photoFile}
            onChange={handleFileChange}
            InputProps={{
              startAdornment: <AttachFileIcon />,
            }}
            error={!!error?.errors?.photo}
            helperText={error?.errors?.photo}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="roles-label">Роль</InputLabel>
            <Select
              labelId="roles-label"
              name="roles"
              value={user.roles}
              onChange={handleRoleChange}
              multiple
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default UserEntityCreateEdit;
