import { Outlet } from 'react-router-dom';
import '@/styles/main.css';
import { Toaster } from '@/components/ui/toaster';

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default RootLayout;
