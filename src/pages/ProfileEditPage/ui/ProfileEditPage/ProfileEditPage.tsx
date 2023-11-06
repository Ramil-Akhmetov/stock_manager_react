import { memo } from 'react';
import { Avatar, Box, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoadingButton } from '@/shared/ui/LoadingButton';

function ProfileEditPage() {
  const authData = useSelector(getUserAuthData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Avatar
          alt="Profile Image"
          src={authData?.photo}
          sx={{ width: 100, height: 100 }}
        />
        <input type="file" accept="image/*" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={authData?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={authData?.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <LoadingButton loading={false} variant="contained" color="primary">
          Сохранить
        </LoadingButton>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton loading={false} variant="outlined" color="secondary">
          Изменить пароль
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default memo(ProfileEditPage);
