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

function TransferEntityCreateEdit() {
  const navigate = useNavigate();
  const { id: transferId } = useParams();
  const [transfer, setTransfer] = useState({
    reason: '',
    items: [],
    from_room_id: '',
    to_room_id: '',
  });
  const [statusOptions, setStatusOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [fromRoomOptions, setFromRoomOptions] = useState([]);
  const [toRoomOptions, setToRoomOptions] = useState([]);
  const [fromRackOptions, setFromRackOptions] = useState([]);
  const [toRackOptions, setToRackOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(!!transferId);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   console.log(transfer);
  // }, [transfer]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await fetch(`${__API__}/transfer_statuses`, {
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
          setStatusOptions(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch status options');
        }
      } catch (err) {
        setError(err.message);
      }
    };

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

    const fetchToRoomOptions = async () => {
      try {
        const response = await fetch(`${__API__}/rooms`, {
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
          setToRoomOptions(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch to room options');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStatusOptions();
    fetchFromRoomOptions();
    fetchToRoomOptions();
  }, []);

  useEffect(() => {
    if (transferId) {
      setLoading(true);
      const fetchTransfer = async () => {
        try {
          const response = await fetch(`${__API__}/transfers/${transferId}`, {
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
            setTransfer(data.data);
          } else {
            throw new Error(data.message || 'Failed to fetch transfer');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTransfer();
    }
  }, [transferId]);

  useEffect(() => {
    const fetchItemsFromRoom = async () => {
      if (transfer.from_room_id) {
        try {
          const response = await fetch(
            `${__API__}/items?room_id=${transfer.from_room_id}`,
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
  }, [transfer.from_room_id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTransfer((prevTransfer) => {
      if (name.startsWith('transfer_status.')) {
        const statusKey = name.split('.')[1];
        return {
          ...prevTransfer,
          transfer_status: {
            ...prevTransfer.transfer_status,
            [statusKey]: value,
          },
        };
      }
      return { ...prevTransfer, [name]: value };
    });
  }, []);

  // const handleItemsChange = useCallback((event, value) => {
  //   setTransfer((prevTransfer) => ({
  //     ...prevTransfer,
  //     items: value.map((item) => ({
  //       ...item,
  //       fullTransfer: true,
  //       newCode: '',
  //       quantity: '',
  //       toRack: null,
  //     })),
  //   }));
  // }, []);
  const handleItemsChange = useCallback((event, value) => {
    setTransfer((prevTransfer) => ({
      ...prevTransfer,
      items: value.map((item) => {
        // Check if the item already exists in the transfer
        const existingItem = prevTransfer.items.find((i) => i.id === item.id);
        if (existingItem) {
          // If the item exists, return it without changes
          return existingItem;
        }
        // If the item is new, initialize its values
        return {
          ...item,
          fullTransfer: true,
          newCode: '',
          to_rack_id: null,
        };
      }),
    }));
  }, []);

  const handleRoomChange = (field, setRackOptionsField) => (event, value) => {
    setTransfer((prevTransfer) => {
      const updatedTransfer = {
        ...prevTransfer,
        [field]: value ? value.id : '',
      };

      if (value && value.room_type.name === 'Склад') {
        if (field === 'to_room_id') {
          setToRackOptions(value.racks);
        }
      } else {
        setRackOptionsField([]);
        if (field === 'from_room_id') {
          updatedTransfer.from_rack = '';
        } else if (field === 'to_room_id') {
          updatedTransfer.to_rack = '';
        }
      }

      return updatedTransfer;
    });
  };

  const handleFullTransferChange = (index) => (event) => {
    const { checked } = event.target;
    setTransfer((prevTransfer) => {
      const updatedItems = [...prevTransfer.items];
      updatedItems[index].fullTransfer = checked;
      if (checked) {
        updatedItems[index].newCode = '';
        updatedItems[index].quantity = '';
      }
      return {
        ...prevTransfer,
        items: updatedItems,
      };
    });
  };

  const handleNewCodeChange = (index) => (event) => {
    const { value } = event.target;
    setTransfer((prevTransfer) => {
      const updatedItems = [...prevTransfer.items];
      updatedItems[index].newCode = value;
      return {
        ...prevTransfer,
        items: updatedItems,
      };
    });
  };

  const handleQuantityChange = (index) => (event) => {
    const { value } = event.target;
    setTransfer((prevTransfer) => {
      const updatedItems = [...prevTransfer.items];
      updatedItems[index].quantity = value;
      return {
        ...prevTransfer,
        items: updatedItems,
      };
    });
  };

  const handleRackChangeForItem = (index) => (event, value) => {
    setTransfer((prevTransfer) => {
      const updatedItems = [...prevTransfer.items];
      updatedItems[index].to_rack_id = value ? value.id : null;
      return {
        ...prevTransfer,
        items: updatedItems,
      };
    });
  };

  const handleRackChange = (field) => (event, value) => {
    setTransfer((prevTransfer) => ({
      ...prevTransfer,
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
          ? `${__API__}/transfers/${transferId}`
          : `${__API__}/transfers`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_ACCESS_KEY
            )}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(transfer),
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
        navigate(`/transfers/${data.data.id}`);
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
            label="Причина"
            name="reason"
            value={transfer.reason}
            onChange={handleChange}
            fullWidth
            margin="normal"
            minRows={3}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            error={!!error?.errors?.reason}
            helperText={error?.errors?.reason}
          />
          <FormControl fullWidth margin="normal">
            <Autocomplete
              options={fromRoomOptions}
              getOptionLabel={(option) =>
                `${option.room_type.name}: ${option.number} - ${option.name}`
              }
              value={
                fromRoomOptions.find(
                  (room) => room.id === transfer.from_room_id
                ) || null
              }
              onChange={handleRoomChange('from_room_id', setFromRackOptions)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Откуда"
                  required
                  variant="outlined"
                  error={!!error?.errors?.from_room_id}
                  helperText={error?.errors?.from_room_id}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              options={toRoomOptions}
              getOptionLabel={(option) =>
                `${option.room_type.name}: ${option.number} - ${option.name}`
              }
              value={
                toRoomOptions.find((room) => room.id === transfer.to_room_id) ||
                null
              }
              onChange={handleRoomChange('to_room_id', setToRackOptions)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Куда"
                  variant="outlined"
                  error={!!error?.errors?.to_room_id}
                  helperText={error?.errors?.to_room_id}
                  required
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
                transfer.items.map((i) => i.id).includes(item.id)
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
          {transfer.items.length > 0 && (
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Код</TableCell>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Полный перенос</TableCell>
                    {transfer.to_room_id &&
                      toRoomOptions.find(
                        (room) => room.id === transfer.to_room_id
                      ).room_type.name === 'Склад' && (
                        <TableCell>Стеллаж (Куда)</TableCell>
                      )}

                    {transfer.items.some((item) => !item.fullTransfer) && (
                      <>
                        <TableCell>Новый код</TableCell>
                        <TableCell>Количество</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transfer.items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.fullTransfer}
                          onChange={handleFullTransferChange(index)}
                        />
                      </TableCell>
                      {transfer.to_room_id &&
                        toRoomOptions.find(
                          (room) => room.id === transfer.to_room_id
                        ).room_type.name === 'Склад' && (
                          <TableCell sx={{ width: '200px' }}>
                            <FormControl fullWidth margin="normal">
                              <Autocomplete
                                options={toRackOptions}
                                getOptionLabel={(option) => `${option.name}`}
                                value={
                                  toRackOptions.find(
                                    (rack) => rack.id === item.to_rack_id
                                  ) || null
                                }
                                onChange={handleRackChangeForItem(index)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    required
                                    label="Стеллаж (Куда)"
                                    variant="outlined"
                                    error={
                                      !!error?.errors?.[
                                        `items.${index}.to_rack_id`
                                      ]
                                    }
                                    helperText={
                                      error?.errors?.[
                                        `items.${index}.to_rack_id`
                                      ]
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                          </TableCell>
                        )}

                      {transfer.items.some((i) => !i.fullTransfer) && (
                        <>
                          <TableCell>
                            {!item.fullTransfer && (
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
                            {!item.fullTransfer && (
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

export default TransferEntityCreateEdit;
