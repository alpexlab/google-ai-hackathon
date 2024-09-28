import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/Base';
import Home from '@/pages/home';
import AuthRequired from '@/components/AuthRequired';
import Login from '@/pages/login';
import PatientDetails from '@/pages/details';
import AddScan from '@/pages/details/AddScan';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRequired>
        <RootLayout />
      </AuthRequired>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/details',
        element: <PatientDetails />,
      },
      {
        path: '/add-scan',
        element: <AddScan />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

export const CustomRouter = () => {
  return <RouterProvider router={router} />;
};
