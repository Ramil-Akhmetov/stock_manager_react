import { useEffect } from 'react';

export function useInitialEffect(callback: () => void) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
