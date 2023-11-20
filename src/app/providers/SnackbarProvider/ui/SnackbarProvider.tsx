import { SnackbarProvider as SnackbarProviderNotistack } from 'notistack';
import { ReactNode } from 'react';
import { AlertSnackbar } from '@/shared/ui/AlertSnackbar';

interface SnackbarProviderProps {
  children: ReactNode;
}
export function SnackbarProvider(props: SnackbarProviderProps) {
  const { children } = props;
  return (
    <SnackbarProviderNotistack
      Components={{
        success: AlertSnackbar,
        error: AlertSnackbar,
        warning: AlertSnackbar,
        info: AlertSnackbar,
      }}
    >
      {children}
    </SnackbarProviderNotistack>
  );
}
