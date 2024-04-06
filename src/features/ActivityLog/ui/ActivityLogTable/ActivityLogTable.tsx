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
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import { useGetActivityLogs } from '../../api/activityLogApi';

const ActivityLogTable = memo(() => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { isLoading, data } = useGetActivityLogs({
    limit,
    page: page + 1,
    order,
    orderBy,
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
      {/* <Toolbar sx={{ pl: { sm: 2 } }}>
        <Typography variant="h6">Activity logs</Typography>
      </Toolbar> */}

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'created_at'}
                direction={orderBy === 'created_at' ? order : 'desc'}
                onClick={() => handleSort('created_at')}
              >
                Created at
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'desc'}
                onClick={() => handleSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'description'}
                direction={orderBy === 'description' ? order : 'desc'}
                onClick={() => handleSort('description')}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell>User</TableCell>
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
                {new Date(row.created_at).toLocaleString()}
              </TableCell>
              <TableCell>{row.log_name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                {row.causer && (
                  <Box
                    sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                  >
                    <Avatar src={row.causer.photo} />
                    <Typography>
                      {`${row.causer.surname} ${row.causer.name} ${row.causer.patronymic}`}
                    </Typography>
                  </Box>
                )}
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

export default ActivityLogTable;
