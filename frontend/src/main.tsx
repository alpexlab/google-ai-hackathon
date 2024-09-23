import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomRouter } from '@/routes/base';
import '@/index.css';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CustomRouter />
    </AuthProvider>
  </React.StrictMode>
);
