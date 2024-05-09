import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ItemsTable } from '@/features/ItemsTable';
import { UsersTable } from '@/features/UsersTable';

function MainPage() {
  return (
    <Page>
      {/* <ItemsTable /> */}
      {/* <UsersTable /> */}
    </Page>
  );
}

export default memo(MainPage);
