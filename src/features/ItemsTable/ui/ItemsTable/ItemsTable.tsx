import { memo } from 'react';
import { Item } from '@/shared/entites/Item/item.ts';
import { Column, DataTable } from '@/shared/ui/DataTable';
import { useGetItems } from '../../api/itemsApi.ts';

const itemColumns: Column[] = [
  { name: 'code', label: 'Код', isSort: true },
  { name: 'name', label: 'Название', isSort: true },
  { name: 'quantity', label: 'Количество', isSort: true },
  { name: 'unit', label: 'Единица измерения', isSort: true },
  {
    name: 'category_id',
    label: 'Категория',
    isSort: true,
    format: (row: Item) => <>{`${row.category?.name}`}</>,
  },
  {
    name: 'type_id',
    label: 'Тип',
    isSort: true,
    format: (row: Item) => <>{`${row.type?.name}`}</>,
  },
  {
    name: 'room_id',
    label: 'Помещение',
    isSort: true,
    format: (row: Item) => (
      <>{`${row.room?.room_type.name} ${row.room?.number} - ${row.room?.name}`}</>
    ),
  },
  {
    name: 'responsible',
    label: 'Ответственное лицо',
    format: (row: Item) => (
      <>
        {row.room ? (
          <>
            {`${row.room?.user?.surname} ${row.room?.user?.name} ${row.room?.user?.patronymic}`}
          </>
        ) : (
          <>-</>
        )}
      </>
    ),
  },
];
interface ItemsTableProps {
  search?: string;
  params?: any;
}

const ItemsTable = memo((props: ItemsTableProps) => {
  const { search, params } = props;
  return (
    <DataTable
      title="Объекты"
      columns={itemColumns}
      dataFetchQuery={useGetItems}
      search={search}
      api_prefix="items"
      params={params}
    />
  );
});

export default ItemsTable;
