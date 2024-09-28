import { Outlet } from 'react-router-dom';
import '@/styles/main.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '../ui/navbar';

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
}

export default RootLayout;
