import {
  Alert,
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { memo, useState, useEffect } from 'react';
import { useCreateUser } from '@/features/CreateUser/api/createUserApi.ts';
import { useAppDispatch } from '../../lib/hooks/useAppDispatch.ts';
import { ErrorResponse, isErrorResponse } from '../../types/errorResponse.ts';
import { LoadingButton } from '../LoadingButton/index.ts';

export interface Field {
  name: string;
  label: string;
  type: 'input' | 'select';
  dataFetchFieldQuery?: () => Promise<{ id: string; name: string }[]>; // For select type
}
interface DataFormProps {
  title: string;
  fields: Field[];

  id?: number;
  dataFetchQuery?: (...args: any) => any;
  dataSubmitQuery?: (...args: any) => any;
  dataEditQuery?: (...args: any) => any;
}
function DataForm(props: DataFormProps) {
  const { title, id, fields, dataFetchQuery, dataSubmitQuery, dataEditQuery } =
    props;
  const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState({});

  const { data: dataMain } = dataFetchQuery(id);
  const [editData, { isLoadingEdit }] = dataEditQuery();

  useEffect(() => {
    const fetchOptions = async () => {
      if (dataFetchQuery) {
        try {
          const options = await dataFetchQuery();
          const newOptions = {};
          fields.forEach((field) => {
            if (field.type === 'select') {
              newOptions[field.name] = options;
            }
          });
          setSelectOptions(newOptions);
        } catch (e) {
          if (isErrorResponse(e)) {
            setError(e);
          }
        }
      }
    };
    fetchOptions();
  }, [dataFetchQuery, fields]);

  useEffect(() => {
    if (dataMain) {
      setData(dataMain?.data);
    }
  }, [dataMain]);

  const handleEditSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await editData({ body: data, id }).unwrap();
      enqueueSnackbar('Changes successfully saved', {
        variant: 'success',
      });
    } catch (e) {
      if (isErrorResponse(e)) {
        enqueueSnackbar(e.data.message, { variant: 'error' });
      }
    } finally {
      setEditing(false);
    }
  };

  const handleCreateSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await dataSubmitQuery(data).unwrap();
      enqueueSnackbar('New data successfully created', {
        variant: 'success',
      });
    } catch (e) {
      if (isErrorResponse(e)) {
        enqueueSnackbar(e.data.message, { variant: 'error' });
      }
    } finally {
      setIsLoading(false);
      setEditing(false);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (fieldName) => (evt) => {
    const { value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        {error && (
          <Alert severity="error" variant="outlined">
            {error.data.message}
          </Alert>
        )}

        {fields.map((field) => (
          <React.Fragment key={field.name}>
            {field.type === 'input' && (
              <TextField
                margin="normal"
                fullWidth
                label={field.label}
                type="text"
                disabled={!editing || !!id}
                value={data?.[field.name] || ''}
                onChange={handleChange(field.name)}
              />
            )}
            {field.type === 'select' && (
              <Select
                value={data?.[field.name] || ''}
                onChange={handleChange(field.name)}
                disabled={!editing || id}
              >
                {selectOptions[field.name]?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </React.Fragment>
        ))}

        {id ? (
          editing ? (
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
              onClick={handleEditSubmit}
            >
              Save
            </LoadingButton>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )
        ) : (
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            onClick={handleCreateSubmit}
          >
            Create
          </LoadingButton>
        )}
      </Box>
    </Box>
  );
}

export default memo(DataForm);
