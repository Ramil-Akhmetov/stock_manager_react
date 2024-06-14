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
  Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React, { ChangeEvent, memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Column {
  name: string;
  label: string;
  minWidth?: number;
  isSort?: boolean;
  align?: 'right' | 'left' | 'center';
  format?: (row: any) => JSX.Element;
}
interface DataTableProps {
  api_prefix: string;
  title: string;
  columns: Column[];
  dataFetchQuery: (...args: any) => any;
  search?: string;
  params?: any;
}
function DataTable(props: DataTableProps) {
  const navigate = useNavigate();
  const { title, params, columns, dataFetchQuery, search, api_prefix } = props;

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const timestampRef = useRef(Date.now()).current;
  const { isLoading, data } = dataFetchQuery({
    limit,
    page: page + 1,
    order,
    orderBy,
    search,
    session_id: timestampRef,
    ...params,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const hangleRowClick = (row: any) => () => {
    navigate(`/${api_prefix}/${row.id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Toolbar sx={{ pl: { sm: 2 } }}>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.name}
                align={column.align || 'left'}
                style={{ minWidth: column.minWidth }}
              >
                {column.isSort ? (
                  <TableSortLabel
                    active={orderBy === column.name}
                    direction={orderBy === column.name ? order : 'asc'}
                    onClick={() => handleSort(column.name)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  <>{column.label}</>
                )}
              </TableCell>
            ))}
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
              onClick={hangleRowClick(row)}
              sx={{ cursor: 'pointer' }}
            >
              {columns.map((column) => (
                <TableCell key={column.name} align={column.align}>
                  {column.format ? column.format(row) : row[column.name] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data?.meta.total === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
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
}

export default memo(DataTable);
