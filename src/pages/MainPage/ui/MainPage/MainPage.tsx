import { memo } from 'react';
import UserEntityCreateEdit from '@/pages/EntityTables/User/UserEntityCreateEdit';
import { Page } from '@/widgets/Page';
import { AboutProgram } from '@/features/AboutProgram';
import { CategoryEdit } from '@/features/CategoryEdit';
import {
  useCreateCategory,
  useEditCategory,
  useGetCategory,
} from '@/features/CategoryEdit/api/categoryEditApi.ts';
import { EntityTable } from '@/features/EntityTable';
import { DataForm } from '@/shared/ui/DataForm';

function MainPage() {
  return (
    <Page>
      {/* <AboutProgram /> */}
      {/* <ItemsTable /> */}
      {/* <UsersTable /> */}
      {/* <CategoryEdit categoryId={1} /> */}

      {/*  <DataForm */}
      {/*    title="" */}
      {/*    fields={[ */}
      {/*      { */}
      {/*        name: 'name', */}
      {/*        label: 'Название', */}
      {/*        type: 'input', */}
      {/*      }, */}
      {/*      { */}
      {/*        name: 'code', */}
      {/*        label: 'code', */}
      {/*        type: 'input', */}
      {/*      }, */}
      {/*    ]} */}
      {/*    dataFetchQuery={useGetCategory} */}
      {/*    dataEditQuery={useEditCategory} */}
      {/*    dataSubmitQuery={() => { */}
      {/*      return [ */}
      {/*        () => { */}
      {/*          return {}; */}
      {/*        }, */}
      {/*        { */}
      {/*          data: {}, */}
      {/*        }, */}
      {/*      ]; */}
      {/*    }} */}
      {/*    id={1} */}
      {/*  /> */}

      {/*  <DataForm */}
      {/*    title="" */}
      {/*    fields={[ */}
      {/*      { */}
      {/*        name: 'name', */}
      {/*        label: 'Название', */}
      {/*        type: 'input', */}
      {/*      }, */}
      {/*      { */}
      {/*        name: 'code', */}
      {/*        label: 'code', */}
      {/*        type: 'input', */}
      {/*      }, */}
      {/*    ]} */}
      {/*    dataFetchQuery={() => { */}
      {/*      return { data: {} }; */}
      {/*    }} */}
      {/*    dataEditQuery={() => { */}
      {/*      return [ */}
      {/*        () => { */}
      {/*          return {}; */}
      {/*        }, */}
      {/*        { */}
      {/*          data: {}, */}
      {/*        }, */}
      {/*      ]; */}
      {/*    }} */}
      {/*    dataSubmitQuery={() => { */}
      {/*      return [ */}
      {/*        () => { */}
      {/*          return {}; */}
      {/*        }, */}
      {/*        { */}
      {/*          data: {}, */}
      {/*        }, */}
      {/*      ]; */}
      {/*    }} */}
      {/*  /> */}

      {/* <EntityTable /> */}
      {/* <CheckoutEntityCreateEdit /> */}
    </Page>
  );
}

export default memo(MainPage);
