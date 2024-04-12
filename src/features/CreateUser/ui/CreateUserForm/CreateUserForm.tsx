import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Box,
  Alert,
  Avatar,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { MuiTelInput, MuiTelInputInfo } from 'mui-tel-input';
import { useSnackbar } from 'notistack';
import { memo, ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRouteMain } from '@/shared/consts/router.ts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer';
import { isErrorResponse } from '@/shared/types/errorResponse.ts';
import { LoadingButton } from '@/shared/ui/LoadingButton';
import { useCreateUser, useGetRoles } from '../../api/createUserApi.ts';
import {
  getCreateUserEmail,
  getCreateUserName,
  getCreateUserPatronymic,
  getCreateUserPhone,
  getCreateUserRole,
  getCreateUserSurname,
} from '../../model/selectors/selectors.ts';
import {
  createUserActions,
  createUserReducer,
} from '../../model/slices/createUserSlice.ts';

const reducers: ReducerList = {
  createUser: createUserReducer,
};
const CreateUserForm = memo(() => {
  useAsyncReducer({ reducers });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useSelector(getCreateUserEmail);
  const name = useSelector(getCreateUserName);
  const surname = useSelector(getCreateUserSurname);
  const patronymic = useSelector(getCreateUserPatronymic);
  const phone = useSelector(getCreateUserPhone);
  const role = useSelector(getCreateUserRole);
  const [photo, setPhoto] = useState<File | null | undefined>(null);

  const [createUser, { isLoading, error }] = useCreateUser();

  const { data: dataRoles } = useGetRoles(null);

  const onChangeName = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(createUserActions.setName(evt.target.value));
    },
    [dispatch]
  );

  const onChangeSurname = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(createUserActions.setSurname(evt.target.value));
    },
    [dispatch]
  );

  const onChangePatronymic = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(createUserActions.setPatronymic(evt.target.value));
    },
    [dispatch]
  );

  const onChangeEmail = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(createUserActions.setEmail(evt.target.value));
    },
    [dispatch]
  );
  const onChangePhone = useCallback(
    (newValue: string, info: MuiTelInputInfo) => {
      dispatch(createUserActions.setPhone(newValue));
    },
    [dispatch]
  );

  const onChangePhoto = useCallback((newValue: File | null) => {
    setPhoto(newValue);
  }, []);

  const onChangeRole = useCallback(
    (evt: SelectChangeEvent<string>) => {
      dispatch(createUserActions.setRole(evt.target.value));
    },
    [dispatch]
  );

  const onCreateUser = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      try {
        const response = await createUser({
          name,
          surname,
          patronymic,
          role,
          phone,
          email,
          photo,
        }).unwrap();

        navigate(getRouteMain());
        enqueueSnackbar('Вы успешно создали нового пользователя', {
          variant: 'success',
        });
      } catch (e) {
        if (isErrorResponse(e)) {
          enqueueSnackbar(e.data.message, { variant: 'error' });
        }
      }
    },
    [
      createUser,
      name,
      surname,
      patronymic,
      role,
      phone,
      email,
      photo,
      navigate,
      enqueueSnackbar,
    ]
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <PersonAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Создание нового пользователя
      </Typography>
      <Box component="form" onSubmit={onCreateUser} sx={{ mt: 1 }}>
        {isErrorResponse(error) && (
          <Alert severity="error" variant="outlined">
            {error.data.message}
          </Alert>
        )}
        <TextField
          margin="normal"
          fullWidth
          label="Имя"
          type="text"
          autoFocus
          required
          value={name}
          onChange={onChangeName}
          error={isErrorResponse(error) && !!error.data.errors?.name}
          helperText={isErrorResponse(error) && error.data.errors?.name}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Фамилия"
          type="text"
          required
          value={surname}
          onChange={onChangeSurname}
          error={isErrorResponse(error) && !!error.data.errors?.surname}
          helperText={isErrorResponse(error) && error.data.errors?.surname}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Отчество"
          type="text"
          required
          value={patronymic}
          onChange={onChangePatronymic}
          error={isErrorResponse(error) && !!error.data.errors?.patronymic}
          helperText={isErrorResponse(error) && error.data.errors?.patronymic}
        />
        <MuiTelInput
          margin="normal"
          fullWidth
          label="Телефон"
          required
          value={phone}
          defaultCountry="RU"
          onChange={onChangePhone}
          error={isErrorResponse(error) && !!error.data.errors?.phone}
          helperText={isErrorResponse(error) && error.data.errors?.phone}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          error={isErrorResponse(error) && !!error.data.errors?.email}
          helperText={isErrorResponse(error) && error.data.errors?.email}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Роль</InputLabel>
          <Select value={role} label="Роль" onChange={onChangeRole}>
            {dataRoles?.data.map((r) => (
              <MenuItem key={r.id} value={r.id}>
                {r.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MuiFileInput
          margin="normal"
          fullWidth
          placeholder="Фото"
          value={photo}
          onChange={onChangePhoto}
          InputProps={{
            startAdornment: <AttachFileIcon />,
          }}
          error={isErrorResponse(error) && !!error.data.errors?.photo}
          helperText={isErrorResponse(error) && error.data.errors?.photo}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Создать
        </LoadingButton>
      </Box>
    </Box>
  );
});

export default CreateUserForm;
