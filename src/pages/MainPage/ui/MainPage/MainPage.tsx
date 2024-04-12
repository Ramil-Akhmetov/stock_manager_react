import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { AboutProgram } from '@/features/AboutProgram';
import { ActivityLog, ActivityLogTable } from '@/features/ActivityLog';
import { CreateUserForm } from '@/features/CreateUser';
import { ResetPasswordForm } from '@/features/ResetPassword';
import { UsersTable } from '@/features/UsersTable';

function MainPage() {
  return (
    <Page>
      {/* <BugButton /> */}
      {/* <ActivityLog id={1} /> */}
      {/* <UsersTable /> */}
      {/* <AboutProgram /> */}
      <CreateUserForm />
    </Page>
  );
}

export default memo(MainPage);
