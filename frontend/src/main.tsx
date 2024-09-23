import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomRouter } from '@/routes/base';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomRouter />
  </React.StrictMode>
);
