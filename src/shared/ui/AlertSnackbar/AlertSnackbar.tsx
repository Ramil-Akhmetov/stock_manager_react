import { Alert, AlertColor, AlertProps } from '@mui/material';
import { SnackbarContent, CustomContentProps } from 'notistack';
import { forwardRef, useState } from 'react';
import { useInitialEffect } from '../../lib/hooks/useInitialEffect';

interface AlertSnackbarProps extends CustomContentProps {
  alertProps?: AlertProps;
}

export const AlertSnackbar = forwardRef<HTMLDivElement, AlertSnackbarProps>(
  (props, ref) => {
    const { message, alertProps, variant } = props;
    const [severity, setSeverity] = useState<AlertColor>('success');

    useInitialEffect(() => {
      if (variant === 'error') {
        setSeverity('error');
      } else if (variant === 'warning') {
        setSeverity('warning');
      } else if (variant === 'info') {
        setSeverity('info');
      }
    });

    return (
      <SnackbarContent ref={ref}>
        <Alert
          variant="filled"
          severity={severity}
          {...alertProps}
          sx={{
            '@media (min-width:600px)': {
              minWidth: '100% !important',
            },
            width: '100%',
          }}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

AlertSnackbar.displayName = 'AlertSnackbar';
