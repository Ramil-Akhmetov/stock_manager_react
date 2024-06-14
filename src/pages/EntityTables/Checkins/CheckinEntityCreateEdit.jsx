import AttachFileIcon from '@mui/icons-material/AttachFile.js';
import {
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  Grid,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { MuiFileInput } from 'mui-file-input';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton/index.ts';
import { TextareaAutosize } from '@/shared/ui/TextareaAutosize/TextareaAutosize.tsx';

function CheckinEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: checkinId } = useParams();
  const [checkin, setCheckin] = useState({
    note: '',
    supplier_id: '',
    items: [
      {
        id: null,
        name: '',
        code: '',
        quantity: '',
        unit: '',
        category_id: '',
        type_id: '',
        group_id: '',
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!checkinId);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [room, setRoom] = useState({});
  const [racks, setRacks] = useState([]);
  const [types, setTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchRacks = async () => {
    if (!room) {
      return;
    }
    try {
      const response = await fetch(`${__API__}/racks?room_id=${room?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_ACCESS_KEY
          )}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setRacks(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(room);
    fetchRacks();
  }, [room]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${__API__}/suppliers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setSuppliers(data.data);
      } catch (err) {
        console.error(err);
      }
    };

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

    const fetchRooms = async () => {
      try {
        const response = await fetch(`${__API__}/rooms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setRooms(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (checkinId) {
      setLoading(true);
      const fetchCheckin = async () => {
        try {
          const response = await fetch(`${__API__}/checkins/${checkinId}`, {
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
          setCheckin({
            ...data.data,
            note: data.data.note || '',
            supplier_id: data.data.supplier_id || '',
            items: data.data.items.map((item) => ({
              ...item,
              id: item.id || null,
              name: item.name || '',
              code: item.code || '',
              quantity: item.quantity || '',
              unit: item.unit || '',
              category_id: item.category_id || '',
              type_id: item.type_id || '',
              group_id: item.group_id || '',
            })),
          });
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCheckin();
    }

    fetchSuppliers();
    fetchCategories();
    fetchTypes();
    fetchRooms();
    fetchRacks();
  }, [checkinId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCheckin((prevCheckin) => ({ ...prevCheckin, [name]: value }));
  }, []);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setCheckin((prevCheckin) => {
      const items = [...prevCheckin.items];
      items[index] = { ...items[index], [name]: value };
      return { ...prevCheckin, items };
    });
  };

  const handleAddItem = () => {
    setCheckin((prevCheckin) => ({
      ...prevCheckin,
      items: [
        ...prevCheckin.items,
        {
          name: '',
          code: '',
          quantity: '',
          unit: '',
          category_id: '',
          type_id: '',
          group_id: '',
        },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setCheckin((prevCheckin) => {
      const items = [...prevCheckin.items];
      items.splice(index, 1);
      return { ...prevCheckin, items };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('note', checkin.note);
      formData.append('supplier_id', checkin.supplier_id);
      formData.append('room_id', room?.id);
      checkin.items.forEach((item, index) => {
        if (item.id !== null && item.id !== undefined) {
          formData.append(`items[${index}][id]`, item.id);
        }
        formData.append(`items[${index}][rack_id]`, item.rack_id);
        formData.append(`items[${index}][name]`, item.name);
        formData.append(`items[${index}][code]`, item.code);
        formData.append(`items[${index}][quantity]`, item.quantity);
        formData.append(`items[${index}][unit]`, item.unit);
        formData.append(`items[${index}][category_id]`, item.category_id);
        formData.append(`items[${index}][type_id]`, item.type_id);
        formData.append(`items[${index}][group_id]`, item.group_id);
      });

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
          ? `${__API__}/checkins/${checkinId}?_method=PUT`
          : `${__API__}/checkins`,
        requestOptions
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          `Поступление ${isEditing ? 'обновлено' : 'создано'} успешно`,
          {
            variant: 'success',
          }
        );
        navigate(`/checkins/${data.data.id}`);
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
          {isEditing ? 'Редактировать поступление' : 'Создать поступление'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={suppliers}
            getOptionLabel={(option) =>
              `${option.company} - ${option.surname} ${option.name} ${option.patronymic}`
            }
            onChange={(event, newValue) => {
              setCheckin((prevCheckin) => ({
                ...prevCheckin,
                supplier_id: newValue ? newValue.id : '',
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Поставщик"
                fullWidth
                margin="normal"
                error={!!error?.errors?.supplier_id}
                helperText={error?.errors?.supplier_id}
              />
            )}
            value={suppliers.find((s) => s.id === checkin.supplier_id) || null}
          />
          <Autocomplete
            options={rooms}
            getOptionLabel={(option) => `${option.number} - ${option.name}`}
            onChange={(event, newValue) => {
              setRoom(newValue);
              // setCheckin((prevCheckin) => ({
              //   ...prevCheckin,
              //   room_id: newValue ? newValue.id : '',
              // }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Помещение"
                fullWidth
                margin="normal"
                error={!!error?.errors?.room_id}
                helperText={error?.errors?.room_id}
              />
            )}
            value={rooms.find((r) => r.id === room?.id) || null}
          />
          <TextareaAutosize
            label="Примечание"
            name="note"
            value={checkin.note}
            onChange={handleChange}
            margin="normal"
            minRows={3}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          <Typography variant="h5" gutterBottom mt={3}>
            Объекты
          </Typography>
          {checkin.items.map((item, index) => (
            <Paper
              key={index}
              style={{
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Наименование"
                    required
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                    margin="normal"
                    error={!!error?.errors?.[`items.${index}.name`]}
                    helperText={error?.errors?.[`items.${index}.name`]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Код"
                    required
                    name="code"
                    value={item.code}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                    margin="normal"
                    error={!!error?.errors?.[`items.${index}.code`]}
                    helperText={error?.errors?.[`items.${index}.code`]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Количество"
                    required
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                    margin="normal"
                    error={!!error?.errors?.[`items.${index}.quantity`]}
                    helperText={error?.errors?.[`items.${index}.quantity`]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Единица измерения"
                    required
                    name="unit"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                    margin="normal"
                    error={!!error?.errors?.[`items.${index}.unit`]}
                    helperText={error?.errors?.[`items.${index}.unit`]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={racks}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      handleItemChange(index, {
                        target: {
                          name: 'rack_id',
                          value: newValue ? newValue.id : '',
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Стелаж"
                        fullWidth
                        margin="normal"
                        error={!!error?.errors?.[`items.${index}.rack_id`]}
                        helperText={error?.errors?.[`items.${index}.rack_id`]}
                      />
                    )}
                    value={racks.find((c) => c.id === item.rack_id) || null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      handleItemChange(index, {
                        target: {
                          name: 'category_id',
                          value: newValue ? newValue.id : '',
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Категория"
                        fullWidth
                        margin="normal"
                        error={!!error?.errors?.[`items.${index}.category_id`]}
                        helperText={
                          error?.errors?.[`items.${index}.category_id`]
                        }
                      />
                    )}
                    value={
                      categories.find((c) => c.id === item.category_id) || null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={types}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      handleItemChange(index, {
                        target: {
                          name: 'type_id',
                          value: newValue ? newValue.id : '',
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Тип"
                        fullWidth
                        margin="normal"
                        error={!!error?.errors?.[`items.${index}.type_id`]}
                        helperText={error?.errors?.[`items.${index}.type_id`]}
                      />
                    )}
                    value={types.find((t) => t.id === item.type_id) || null}
                  />
                </Grid>
              </Grid>
              <Box mt={2} sx={{ justifyContent: 'end', display: 'flex' }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveItem(index)}
                >
                  Удалить
                </Button>
              </Box>
            </Paper>
          ))}
          <Box mt={2} mb={2} sx={{ justifyContent: 'end', display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Добавить объект
            </Button>
          </Box>
          <Box mt={2}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              {isEditing ? 'Сохранить изменения' : 'Создать'}
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </Page>
  );
}

export default CheckinEntityCreateEdit;
