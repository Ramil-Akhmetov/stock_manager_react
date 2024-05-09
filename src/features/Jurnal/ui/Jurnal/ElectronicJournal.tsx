import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import React, { useState } from 'react';

function ElectronicJournal() {
  const [data, setData] = useState([
    {
      name: 'Akhmetov Ramil',
      grades: {
        September: [5, 4, 'Н', 4],
        October: [3, 'Н', ''],
      },
    },
    {
      name: 'Ivanov Ivan',
      grades: {
        September: [4, 'Н', 3, 4],
        October: [5, 4, ''],
      },
    },
  ]);

  const [months, setMonths] = useState({
    September: [1, 2, 3, 4],
    October: [1, 2, 3],
  });

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table border={1}>
          <TableHead>
            <TableRow>
              <TableCell>Имя студента</TableCell>
              {Object.keys(months).map((month) => (
                <TableCell
                  key={month}
                  align="center"
                  colSpan={months[month].length}
                >
                  {month}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Дата</TableCell>
              {Object.entries(months).flatMap(([month, days]) =>
                days.map((day) => (
                  <TableCell key={`${month}-${day}`} align="center">
                    {day}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((student) => (
              <TableRow key={student.name}>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                {Object.entries(student.grades).flatMap(([month, grades]) =>
                  grades.map((grade, index) => (
                    <TableCell
                      key={`${student.name}-${month}-${index}`}
                      padding="none"
                    >
                      <TextField
                        type="text"
                        value={grade}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: 0,
                            textAlign: 'center',
                            height: '5rem',
                          },
                        }}
                      />
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ElectronicJournal;
