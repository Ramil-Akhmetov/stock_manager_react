import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React, { memo, ReactNode } from 'react';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children: ReactNode;
}
function LoadingButton(props: LoadingButtonProps) {
  const { loading, children, ...otherProps } = props;
  return (
    <Button disabled={loading} {...otherProps}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
}

export default memo(LoadingButton);
