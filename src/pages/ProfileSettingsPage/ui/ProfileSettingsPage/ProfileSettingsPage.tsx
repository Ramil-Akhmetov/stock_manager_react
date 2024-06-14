import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { ResetPasswordForm } from '@/features/ResetPassword';
import { getUserAuthData } from '@/entities/User';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';

function ProfileSettingsPage() {
  const authData = useSelector(getUserAuthData);
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState(authData?.email || '');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${__API__}/change_email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_ACCESS_KEY
          )}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        enqueueSnackbar(data.message, { variant: 'error' });
      } else {
        setError('');
        enqueueSnackbar(data.message, { variant: 'success' });
        setEmail(data.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <Box style={{ width: '50%', margin: 'auto' }}>
        <Box sx={{ mb: 10 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Изменение email
          </Typography>
          <TextField
            label="Email"
            value={email}
            fullWidth
            sx={{ mb: 2 }}
            error={!!error}
            helperText={error}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Изменить email
          </Button>
        </Box>

        <ResetPasswordForm />
      </Box>
    </Page>
  );
}

export default ProfileSettingsPage;
