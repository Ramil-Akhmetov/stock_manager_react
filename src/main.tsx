import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider>
          <CssBaseline />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
