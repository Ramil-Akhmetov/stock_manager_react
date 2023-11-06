import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export function BugButton() {
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return (
    <Button variant="contained" onClick={onThrow}>
      Throw error
    </Button>
  );
}
