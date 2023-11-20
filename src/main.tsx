import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { SnackbarProvider } from '@/app/providers/SnackbarProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <CssBaseline />
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </SnackbarProvider>
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
