import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/Base';
import Home from '@/pages/home';
import AuthRequired from '@/components/AuthRequired';
import Login from '@/pages/login';
import Analysis from '@/pages/analysis';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <AuthRequired><RootLayout /></AuthRequired>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/analysis',
    element: <Analysis />,
  },
]);

export const CustomRouter = () => {
  return <RouterProvider router={router} />;
};
