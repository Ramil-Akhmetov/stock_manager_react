import { Alert, Snackbar } from '@mui/material';
import { memo, SyntheticEvent, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import { notificationActions } from '../../model/slice/notificationSlice.ts';

interface NotificationProps {}

export const Notification = memo((props: NotificationProps) => {
  const dispatch = useAppDispatch();

  const onCloseStackbar = useCallback(
    (evt: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(notificationActions.setIsOpen(false));
    },
    [dispatch]
  );

  return (
    <Snackbar open autoHideDuration={6000} onClose={onCloseStackbar}>
      <Alert
        onClose={onCloseStackbar}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        message
      </Alert>
    </Snackbar>
  );
});
