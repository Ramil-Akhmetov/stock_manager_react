import {
  Avatar,
  Box,
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
import { useGetUsers } from '../../api/usersApi';

interface UsersTableProps {
  search?: string;
}

const UsersTable = memo((props: UsersTableProps) => {
  const { search, ...otherProps } = props;

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { isLoading, data } = useGetUsers({
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
        <Typography variant="h6">Пользователи</Typography>
      </Toolbar>

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'surname'}
                direction={orderBy === 'surname' ? order : 'desc'}
                onClick={() => handleSort('surname')}
              >
                ФИО
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'desc'}
                onClick={() => handleSort('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'phone'}
                direction={orderBy === 'phone' ? order : 'desc'}
                onClick={() => handleSort('phone')}
              >
                Номер телефона
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'description'}
                direction={orderBy === 'description' ? order : 'desc'}
                onClick={() => handleSort('description')}
              >
                Роли
              </TableSortLabel>
            </TableCell>
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
              <TableCell component="th" scope="row">
                <Box
                  sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                >
                  <Avatar src={row.photo} />
                  <Typography>
                    {row.surname} {row.name} {row.patronymic}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.roles}</TableCell>
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

export default UsersTable;
