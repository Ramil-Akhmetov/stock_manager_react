import {
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton/index.ts';

function SupplierEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: supplierId } = useParams();
  const [supplier, setSupplier] = useState({
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!supplierId);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (supplierId) {
      setLoading(true);
      const fetchSupplier = async () => {
        try {
          const response = await fetch(`${__API__}/suppliers/${supplierId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem(
                LOCAL_STORAGE_ACCESS_KEY
              )}`,
              Accept: 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }
          const data = await response.json();
          setSupplier(data.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
    }
  }, [supplierId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        isEditing
          ? `${__API__}/suppliers/${supplierId}`
          : `${__API__}/suppliers`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(supplier),
        }
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          `Поставщик ${isEditing ? 'обновлен' : 'создан'} успешно`,
          {
            variant: 'success',
          }
        );
        navigate(`/suppliers/${data.data.id}`);
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
          {isEditing ? 'Редактировать поставщика' : 'Создать поставщика'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Фамилия"
            name="surname"
            value={supplier.surname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.surname}
            helperText={error?.errors?.surname}
          />
          <TextField
            label="Имя"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.name}
            helperText={error?.errors?.name}
          />
          <TextField
            label="Отчество"
            name="patronymic"
            value={supplier.patronymic}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.patronymic}
            helperText={error?.errors?.patronymic}
          />
          <TextField
            label="Телефон"
            name="phone"
            value={supplier.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.phone}
            helperText={error?.errors?.phone}
          />
          <TextField
            label="Email"
            name="email"
            value={supplier.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.email}
            helperText={error?.errors?.email}
          />
          <TextField
            label="Компания"
            name="company"
            value={supplier.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.company}
            helperText={error?.errors?.company}
          />
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

export default SupplierEntityCreateEdit;
