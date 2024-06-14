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

function TypeEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: typeId } = useParams();
  const [type, setType] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!typeId);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (typeId) {
      setLoading(true);
      const fetchType = async () => {
        try {
          const response = await fetch(`${__API__}/types/${typeId}`, {
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

          if (response.ok) {
            setType(data.data);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchType();
    }
  }, [typeId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setType((prevType) => ({ ...prevType, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        isEditing ? `${__API__}/types/${typeId}` : `${__API__}/types`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(type),
        }
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(`Тип ${isEditing ? 'обновлен' : 'создан'} успешно`, {
          variant: 'success',
        });
        navigate(`/types/${data.data.id}`);
      } else {
        setError(data);
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    } catch (err) {
      setError(err.message);
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
          {isEditing ? 'Редактировать тип' : 'Создать тип'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Название"
            name="name"
            value={type.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.name}
            helperText={error?.errors?.name}
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

export default TypeEntityCreateEdit;
