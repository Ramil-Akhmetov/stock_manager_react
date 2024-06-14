import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize/TextareaAutosize';
import { Box, Typography, styled, InputLabel } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import React from 'react';

const TextareaAuto = styled(BaseTextareaAutosize)(
  ({ theme, error }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 6px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${
    error ? red[700] : theme.palette.mode === 'dark' ? grey[700] : grey[200]
  };
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${error ? red[700] : blue[400]};
  }

  &:focus {
    border-color: ${error ? red[700] : blue[400]};
    box-shadow: 0 0 0 2px ${
      error ? red[700] : theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export function TextareaAutosize({
  required,
  label,
  error,
  helperText,
  ...props
}) {
  return (
    <Box>
      <InputLabel error={error} sx={{ mb: 1 }}>
        {label} {required ? '*' : ''}
      </InputLabel>
      <TextareaAuto error={error} {...props} />
      {error && (
        <Typography variant="body2" color="error">
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
