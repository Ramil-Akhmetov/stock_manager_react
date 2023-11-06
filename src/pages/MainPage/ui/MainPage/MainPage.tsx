import { memo, useState } from 'react';
import { BugButton } from '@/app/providers/ErrorBoundary/ui/BugButton.tsx';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';
import { LoadingButton } from '@/shared/ui/LoadingButton';
import { ResetPasswordForm } from '@/features/ResetPassword';
import { ScanTestForm } from '@/features/ScanTest';

function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const fakeLoading = async () => {
    setIsLoading(true);
    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Page>
      <ScanTestForm />
      <h1>Main page1</h1>
      <BugButton />
      <Counter />

      <LoadingButton
        loading={isLoading}
        onClick={fakeLoading}
        variant="contained"
      >
        Test
      </LoadingButton>

      <ResetPasswordForm />
    </Page>
  );
}

export default memo(MainPage);
