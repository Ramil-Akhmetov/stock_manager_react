import {
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton/index.ts';

function ItemEntityEdit() {
  const navigate = useNavigate();
  const { id: itemId } = useParams();
  const [item, setItem] = useState({
    name: '',
    code: '',
    quantity: '',
    unit: '',
    category_id: '',
    type_id: '',
    rack_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!itemId);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${__API__}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await fetch(`${__API__}/types`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setTypes(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (itemId) {
      setLoading(true);
      const fetchItem = async () => {
        try {
          const response = await fetch(`${__API__}/items/${itemId}`, {
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
          setItem({
            ...data.data,
            name: data.data.name || '',
            code: data.data.code || '',
            quantity: data.data.quantity || '',
            unit: data.data.unit || '',
            category_id: data.data.category_id || '',
            type_id: data.data.type_id || '',
            rack_id: data.data.rack_id || '',
          });
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }

    fetchCategories();
    fetchTypes();
  }, [itemId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('code', item.code);
      formData.append('quantity', item.quantity);
      formData.append('unit', item.unit);
      formData.append('category_id', item.category_id);
      formData.append('type_id', item.type_id);

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_ACCESS_KEY
          )}`,
          Accept: 'application/json',
        },
        body: formData,
      };

      const response = await fetch(
        isEditing
          ? `${__API__}/items/${itemId}?_method=PUT`
          : `${__API__}/items`,
        requestOptions
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(`Объект ${isEditing ? 'обновлен' : 'создан'} успешно`, {
          variant: 'success',
        });
        navigate(`/items/${data.data.id}`);
      } else {
        setError(data);
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    } catch (err) {
      console.log(err);
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
        style={{ padding: '20px', maxWidth: '800px', marginTop: '20px' }}
      >
        <Typography variant="h5" gutterBottom>
          {isEditing ? 'Редактировать объект' : 'Создать объект'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Наименование"
            required
            name="name"
            value={item.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.name}
            helperText={error?.errors?.name}
          />
          <TextField
            label="Код"
            required
            name="code"
            value={item.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.code}
            helperText={error?.errors?.code}
          />
          <TextField
            label="Количество"
            required
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.quantity}
            helperText={error?.errors?.quantity}
          />
          <TextField
            label="Единица измерения"
            required
            name="unit"
            value={item.unit}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!error?.errors?.unit}
            helperText={error?.errors?.unit}
          />
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setItem((prevItem) => ({
                ...prevItem,
                category_id: newValue ? newValue.id : '',
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Категория"
                fullWidth
                margin="normal"
                error={!!error?.errors?.category_id}
                helperText={error?.errors?.category_id}
              />
            )}
            value={categories.find((c) => c.id === item.category_id) || null}
          />
          <Autocomplete
            options={types}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setItem((prevItem) => ({
                ...prevItem,
                type_id: newValue ? newValue.id : '',
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип"
                fullWidth
                margin="normal"
                error={!!error?.errors?.type_id}
                helperText={error?.errors?.type_id}
              />
            )}
            value={types.find((t) => t.id === item.type_id) || null}
          />
          <Box mt={2}>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {isEditing ? 'Сохранить' : 'Создать'}
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </Page>
  );
}

export default ItemEntityEdit;
