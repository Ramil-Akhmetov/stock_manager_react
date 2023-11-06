import { AlertProps, SnackbarProps } from '@mui/material';
import { ReactNode } from 'react';

export interface NotificationSchema {
  isOpen?: boolean;
  snackbarProps?: SnackbarProps;
  alert?: true;
  alertProps?: AlertProps;
  children?: ReactNode;
}
