import {
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Chip,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/index.ts';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton/index.ts';
import { TextareaAutosize } from '@/shared/ui/TextareaAutosize/TextareaAutosize.tsx';

function CheckoutEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: checkoutId } = useParams();
  const [checkout, setCheckout] = useState({
    note: '',
    items: [],
    room_id: '',
  });
  const [itemOptions, setItemOptions] = useState([]);
  const [fromRoomOptions, setFromRoomOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!checkoutId);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  useEffect(() => {
    const fetchFromRoomOptions = async () => {
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
        const data = await response.json();

        if (response.ok) {
          setFromRoomOptions(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch from room options');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFromRoomOptions();
  }, []);

  useEffect(() => {
    if (checkoutId) {
      setLoading(true);
      const fetchCheckout = async () => {
        try {
          const response = await fetch(`${__API__}/checkouts/${checkoutId}`, {
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
            setCheckout(data.data);
          } else {
            throw new Error(data.message || 'Failed to fetch checkout');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCheckout();
    }
  }, [checkoutId]);

  useEffect(() => {
    const fetchItemsFromRoom = async () => {
      if (checkout.room_id) {
        try {
          const response = await fetch(
            `${__API__}/items?room_id=${checkout.room_id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(
                  LOCAL_STORAGE_ACCESS_KEY
                )}`,
                Accept: 'application/json',
              },
            }
          );
          const data = await response.json();

          if (response.ok) {
            setItemOptions(data.data);
          } else {
            throw new Error(data.message || 'Failed to fetch items from room');
          }
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchItemsFromRoom();
  }, [checkout.room_id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCheckout((prevCheckout) => {
      if (name.startsWith('transfer_status.')) {
        const statusKey = name.split('.')[1];
        return {
          ...prevCheckout,
          transfer_status: {
            ...prevCheckout.transfer_status,
            [statusKey]: value,
          },
        };
      }
      return { ...prevCheckout, [name]: value };
    });
  }, []);

  // const handleItemsChange = useCallback((event, value) => {
  //   setCheckout((prevCheckout) => ({
  //     ...prevCheckout,
  //     items: value.map((item) => ({
  //       ...item,
  //       fullCheckout: true,
  //       newCode: '',
  //       quantity: '',
  //       toRack: null,
  //     })),
  //   }));
  // }, []);
  const handleItemsChange = useCallback((event, value) => {
    setCheckout((prevCheckout) => ({
      ...prevCheckout,
      items: value.map((item) => {
        // Check if the item already exists in the checkout
        const existingItem = prevCheckout.items.find((i) => i.id === item.id);
        if (existingItem) {
          // If the item exists, return it without changes
          return existingItem;
        }
        // If the item is new, initialize its values
        return {
          ...item,
          fullCheckout: true,
          newCode: '',
          to_rack_id: null,
        };
      }),
    }));
  }, []);

  const handleRoomChange = (field) => (event, value) => {
    setCheckout((prevCheckout) => {
      const updatedCheckout = {
        ...prevCheckout,
        [field]: value ? value.id : '',
      };

      return updatedCheckout;
    });
  };

  const handleFullCheckoutChange = (index) => (event) => {
    const { checked } = event.target;
    setCheckout((prevCheckout) => {
      const updatedItems = [...prevCheckout.items];
      updatedItems[index].fullCheckout = checked;
      if (checked) {
        updatedItems[index].newCode = '';
        updatedItems[index].quantity = '';
      }
      return {
        ...prevCheckout,
        items: updatedItems,
      };
    });
  };

  const handleNewCodeChange = (index) => (event) => {
    const { value } = event.target;
    setCheckout((prevCheckout) => {
      const updatedItems = [...prevCheckout.items];
      updatedItems[index].newCode = value;
      return {
        ...prevCheckout,
        items: updatedItems,
      };
    });
  };

  const handleQuantityChange = (index) => (event) => {
    const { value } = event.target;
    setCheckout((prevCheckout) => {
      const updatedItems = [...prevCheckout.items];
      updatedItems[index].quantity = value;
      return {
        ...prevCheckout,
        items: updatedItems,
      };
    });
  };

  const handleRackChangeForItem = (index) => (event, value) => {
    setCheckout((prevCheckout) => {
      const updatedItems = [...prevCheckout.items];
      updatedItems[index].to_rack_id = value ? value.id : null;
      return {
        ...prevCheckout,
        items: updatedItems,
      };
    });
  };

  const handleRackChange = (field) => (event, value) => {
    setCheckout((prevCheckout) => ({
      ...prevCheckout,
      [field]: value ? value.id : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        isEditing
          ? `${__API__}/checkouts/${checkoutId}`
          : `${__API__}/checkouts`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(checkout),
        }
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          `Перевод ${isEditing ? 'обновлен' : 'создан'} успешно`,
          {
            variant: 'success',
          }
        );
        navigate(`/checkouts/${data.data.id}`);
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
        style={{ padding: '20px', maxWidth: '1000px', marginTop: '20px' }}
      >
        <Typography variant="h5" gutterBottom>
          {isEditing ? 'Редактировать перевод' : 'Создать перевод'}
        </Typography>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.message}
          </Alert>
        )}
        <form>
          <TextareaAutosize
            label="Описание"
            name="note"
            value={checkout.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
            minRows={3}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
            error={!!error?.errors?.note}
            helperText={error?.errors?.note}
          />
          <FormControl fullWidth margin="normal">
            <Autocomplete
              options={fromRoomOptions}
              getOptionLabel={(option) =>
                `${option.room_type.name}: ${option.number} - ${option.name}`
              }
              value={
                fromRoomOptions.find((room) => room.id === checkout.room_id) ||
                null
              }
              onChange={handleRoomChange('room_id')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Откуда"
                  variant="outlined"
                  required
                  error={!!error?.errors?.room_id}
                  helperText={error?.errors?.room_id}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              multiple
              options={itemOptions}
              getOptionLabel={(option) => `${option.code}`}
              value={itemOptions.filter((item) =>
                checkout.items.map((i) => i.id).includes(item.id)
              )}
              onChange={handleItemsChange}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    label={`${option.code}`}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Предметы"
                  required
                  error={!!error?.errors?.items}
                  helperText={error?.errors?.items}
                />
              )}
            />
          </FormControl>
          {checkout.items.length > 0 && (
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Код</TableCell>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Полное списание</TableCell>
                    {checkout.items.some((item) => !item.fullCheckout) && (
                      <>
                        <TableCell>Новый код</TableCell>
                        <TableCell>Количество</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkout.items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.fullCheckout}
                          onChange={handleFullCheckoutChange(index)}
                        />
                      </TableCell>
                      {checkout.items.some((i) => !i.fullCheckout) && (
                        <>
                          <TableCell>
                            {!item.fullCheckout && (
                              <TextField
                                value={item.newCode}
                                onChange={handleNewCodeChange(index)}
                                fullWidth
                                error={
                                  !!error?.errors?.[`items.${index}.newCode`]
                                }
                                helperText={
                                  error?.errors?.[`items.${index}.newCode`]
                                }
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {!item.fullCheckout && (
                              <TextField
                                inputProps={{ min: 1 }}
                                type="number"
                                value={item.quantity}
                                onChange={handleQuantityChange(index)}
                                fullWidth
                                error={
                                  !!error?.errors?.[`items.${index}.quantity`]
                                }
                                helperText={
                                  error?.errors?.[`items.${index}.quantity`]
                                }
                              />
                            )}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <LoadingButton
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

export default CheckoutEntityCreateEdit;
