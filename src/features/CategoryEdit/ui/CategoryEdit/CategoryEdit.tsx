import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer.ts';
import { isErrorResponse } from '@/shared/types/errorResponse.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton';
import { useEditCategory, useGetCategory } from '../../api/categoryEditApi.ts';
import { getCategoryEditName } from '../../model/selectors/selectors.ts';
import {
  categoryEditActions,
  categoryEditReducer,
} from '../../model/slices/categoryEditSlice.ts';

interface CategoryEditProps {
  categoryId: number;
}

const reducers: ReducerList = {
  categoryEdit: categoryEditReducer,
};

const CategoryEdit = memo((props: CategoryEditProps) => {
  const { categoryId } = props;
  useAsyncReducer({ reducers });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);

  const [editCategory, { isLoading, error }] = useEditCategory();
  const { data } = useGetCategory(categoryId);

  const name = useSelector(getCategoryEditName);

  useEffect(() => {
    if (data?.data.name) {
      dispatch(categoryEditActions.setName(data.data.name));
    }
  }, [dispatch, data]);

  const handleSubmit = async () => {
    try {
      const response = await editCategory({
        body: { name },
        id: categoryId,
      }).unwrap();

      enqueueSnackbar('Изменения успешно сохранены', {
        variant: 'success',
      });
    } catch (e) {
      if (isErrorResponse(e)) {
        enqueueSnackbar(e.data.message, { variant: 'error' });
      }
    }
    setEditing(false);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChangeName = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(categoryEditActions.setName(evt.target.value));
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="form" sx={{ mt: 1 }}>
        {isErrorResponse(error) && (
          <Alert severity="error" variant="outlined">
            {error.data.message}
          </Alert>
        )}
        <TextField
          margin="normal"
          fullWidth
          label="Название"
          type="text"
          autoFocus
          disabled={!editing}
          value={name}
          onChange={handleChangeName}
          error={isErrorResponse(error) && !!error.data.errors?.name}
          helperText={isErrorResponse(error) && error.data.errors?.name}
        />
        {editing ? (
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            onClick={handleSubmit}
          >
            Сохранить
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleEditClick}
          >
            Редактировать
          </Button>
        )}
      </Box>
    </Box>
  );
});

export default CategoryEdit;
