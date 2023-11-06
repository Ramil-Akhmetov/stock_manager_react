import { Suspense, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/Router';
import { Navbar } from '@/widgets/Navbar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import { getUserInited, initAuthData } from '@/entities/User';
import { PageLoader } from '@/widgets/PageLoader';

function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <Box className="App" sx={{ display: 'flex' }}>
      <Suspense fallback="">
        <Navbar />
        <AppRouter />
      </Suspense>
    </Box>
  );
}

export default App;
