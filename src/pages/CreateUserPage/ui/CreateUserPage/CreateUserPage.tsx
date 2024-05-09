import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { CreateUserForm } from '@/features/CreateUser';

function CreateUserPage() {
  return (
    <Page>
      <CreateUserForm />
    </Page>
  );
}

export default memo(CreateUserPage);
