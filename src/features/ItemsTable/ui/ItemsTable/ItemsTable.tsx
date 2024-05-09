import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import { useGetItems } from '../../api/itemsApi';

interface ItemsTableProps {
  search?: string;
}

const ItemsTable = memo((props: ItemsTableProps) => {
  const { search, ...otherProps } = props;

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { isLoading, data } = useGetItems({
    limit,
    page: page + 1,
    order,
    orderBy,
    search,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: string) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(property);
      setOrder('desc');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Toolbar sx={{ pl: { sm: 2 } }}>
        <Typography variant="h6">Предметы</Typography>
      </Toolbar>

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'code'}
                direction={orderBy === 'code' ? order : 'desc'}
                onClick={() => handleSort('code')}
              >
                Код
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'desc'}
                onClick={() => handleSort('name')}
              >
                Название
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'quantity'}
                direction={orderBy === 'quantity' ? order : 'desc'}
                onClick={() => handleSort('quantity')}
              >
                Количество
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'unit'}
                direction={orderBy === 'unit' ? order : 'desc'}
                onClick={() => handleSort('unit')}
              >
                Единица измерения
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'category_id'}
                direction={orderBy === 'category_id' ? order : 'desc'}
                onClick={() => handleSort('category_id')}
              >
                Категория
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'room_id'}
                direction={orderBy === 'room_id' ? order : 'desc'}
                onClick={() => handleSort('room_id')}
              >
                Помещение
              </TableSortLabel>
            </TableCell>
            <TableCell>Ответственное лицо</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Загрузка...
              </TableCell>
            </TableRow>
          )}
          {data?.data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.unit || '-'}</TableCell>
              <TableCell>{row?.category?.name}</TableCell>
              <TableCell>{row?.room?.name}</TableCell>
              <TableCell>
                {row?.room?.current_responsible?.user?.surname}{' '}
                {row?.room?.current_responsible?.user?.name}{' '}
                {row?.room?.current_responsible?.user?.patronymic}
              </TableCell>
            </TableRow>
          ))}
          {data?.meta.total === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Нет данных
              </TableCell>
            </TableRow>
          )}
          {data && (
            <TableRow>
              <TablePagination
                count={data.meta.total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ItemsTable;
