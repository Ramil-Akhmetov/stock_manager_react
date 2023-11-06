import { memo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import { getUserAuthData } from '@/entities/User';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);

  if (authData == null) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Toolbar />
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt={`${authData.name} ${authData.surname}`}
          src={authData.photo}
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {`${authData.name} ${authData.surname} ${authData.patronymic}`}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {authData.email}
        </Typography>
        <Divider sx={{ width: '100%', my: 2 }} />
        <Typography variant="h6">Контактная информация</Typography>
        <Typography variant="body1" sx={{ mb: 1, mt: 1 }}>
          Phone: {authData.phone}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Email: {authData.email}
        </Typography>
        {/* Additional authData attributes */}
        {Object.entries(authData.extra_attributes).map(([key, value]) => (
          <Box key={key} sx={{ mb: 1 }}>
            <Typography variant="body1">
              {key}: {value}
            </Typography>
          </Box>
        ))}
        <Button variant="outlined" sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
}

export default memo(ProfilePage);
