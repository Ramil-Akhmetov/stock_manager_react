import { Avatar } from '@mui/material';
import { memo } from 'react';
import { Item } from '@/shared/entites/Item/item.ts';
import { Column, DataTable } from '@/shared/ui/DataTable';
import { useGetUsers } from '../../api/usersApi.ts';

const usersColumns: Column[] = [
  {
    name: 'photo',
    label: 'Фото',
    format: (row: Item) => (
      <>
        {row.photo ? (
          <>
            <Avatar src={row.photo} />
          </>
        ) : (
          <>-</>
        )}
      </>
    ),
  },
  { name: 'surname', label: 'Фамилия', isSort: true },
  { name: 'name', label: 'Имя', isSort: true },
  { name: 'patronymic', label: 'Отчество', isSort: true },
  { name: 'phone', label: 'Телефон', isSort: true },
  { name: 'email', label: 'Email', isSort: true },
  {
    name: 'role',
    label: 'Роль',
    format: (row) => <>{`${row?.roles?.[0]?.name || '-'}`}</>,
  },
];
interface ItemsTableProps {
  search?: string;
  params?: any;
}

const UsersTable = memo((props: ItemsTableProps) => {
  const { search, params } = props;
  return (
    <DataTable
      api_prefix="users"
      title="Пользователи"
      columns={usersColumns}
      dataFetchQuery={useGetUsers}
      search={search}
      params={params}
    />
  );
});

export default UsersTable;
