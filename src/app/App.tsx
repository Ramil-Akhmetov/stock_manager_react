import { Box } from '@mui/material';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import { AppRouter } from './providers/Router';

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
