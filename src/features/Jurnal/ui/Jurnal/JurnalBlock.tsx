import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
} from '@mui/material';
import React, { useState, memo } from 'react';

interface JurnalBlockProps {
  // Тут можно добавить пропсы, если они нужны
}

const JurnalBlock = memo((props: JurnalBlockProps) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const classes = ['C25', '5B', '6A', '6B'];
  const subjects = ['МДК 03.01', 'Физика', 'Литература'];
  const periods = ['1-й четверть', '2-й четверть', '3-й четверть'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="class-selector-label">Группа</InputLabel>
        <Select
          labelId="class-selector-label"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          label="Группа"
        >
          {classes.map((className) => (
            <MenuItem key={className} value={className}>
              {className}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="subject-selector-label">Дисциплина</InputLabel>
        <Select
          labelId="subject-selector-label"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          label="Дисциплина"
        >
          {subjects.map((subjectName) => (
            <MenuItem key={subjectName} value={subjectName}>
              {subjectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl variant="outlined" fullWidth> */}
      {/*  <InputLabel id="period-selector-label">Период</InputLabel> */}
      {/*  <Select */}
      {/*    labelId="period-selector-label" */}
      {/*    value={selectedPeriod} */}
      {/*    onChange={(e) => setSelectedPeriod(e.target.value)} */}
      {/*    label="Период" */}
      {/*  > */}
      {/*    {periods.map((periodName) => ( */}
      {/*      <MenuItem key={periodName} value={periodName}> */}
      {/*        {periodName} */}
      {/*      </MenuItem> */}
      {/*    ))} */}
      {/*  </Select> */}
      {/* </FormControl> */}
      <Button variant="contained" sx={{ marginBottom: '2rem' }}>
        Добавить
      </Button>
    </Box>
  );
});

export default JurnalBlock;
