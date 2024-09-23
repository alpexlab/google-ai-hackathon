import { Outlet } from 'react-router-dom';
import '@/styles/main.css';

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;
