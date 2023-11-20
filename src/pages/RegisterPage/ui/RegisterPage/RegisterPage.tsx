import { Container } from '@mui/material';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { RegisterForm } from '@/features/RegisterUser';

function RegisterPage() {
  return (
    <Page>
      <Container maxWidth="xs">
        <RegisterForm />
      </Container>
    </Page>
  );
}

export default memo(RegisterPage);
