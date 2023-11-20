import { memo } from 'react';
import { BugButton } from '@/app/providers/ErrorBoundary/ui/BugButton.tsx';
import { Page } from '@/widgets/Page';
import { ResetPasswordForm } from '@/features/ResetPassword';

function MainPage() {
  return (
    <Page>
      <BugButton />

      <ResetPasswordForm />
    </Page>
  );
}

export default memo(MainPage);
