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

function CategoryEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const [category, setCategory] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!categoryId);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const fetchCategory = async () => {
        try {
          const response = await fetch(`${__API__}/categories/${categoryId}`, {
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
          setCategory(data.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [categoryId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        isEditing
          ? `${__API__}/categories/${categoryId}`
          : `${__API__}/categories`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(category),
        }
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          `Категория ${isEditing ? 'обновлена' : 'создана'} успешно`,
          {
            variant: 'success',
          }
        );
        navigate(`/categories${data.data.id}`);
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
          {isEditing ? 'Редактировать категорию' : 'Создать категорию'}
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
            value={category.name}
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

export default CategoryEntityCreateEdit;
