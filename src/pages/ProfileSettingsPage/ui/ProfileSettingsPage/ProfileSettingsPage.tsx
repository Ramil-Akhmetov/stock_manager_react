import { Avatar, Grid, TextField } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { LoadingButton } from '@/shared/ui/LoadingButton';

function ProfileSettingsPage() {
  const authData = useSelector(getUserAuthData);

  return (
    <Page>
      {/* profile settings page with resetting password changing email and phone and disabled inputs for name surname and patronymic       */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar
            alt={authData?.name}
            src={authData?.photo}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Имя" value={authData?.name} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Фамилия"
            value={authData?.surname}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Отчество"
            value={authData?.patronymic}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Email" value={authData?.email} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Телефон"
            value={authData?.phone}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton loading={false} variant="contained" fullWidth>
            Сохранить
          </LoadingButton>
        </Grid>
      </Grid>
    </Page>
  );
}

export default memo(ProfileSettingsPage);
