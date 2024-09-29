import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/Base';
import Home from '@/pages/home';
import AuthRequired from '@/components/AuthRequired';
import Login from '@/pages/login';
import PatientDetails from '@/pages/details';
import AddScan from '@/pages/details/AddScan';
import Brain from '@/pages/report/Brain';
import Breast from '@/pages/report/Breast';
import Lungs from '@/pages/report/Lungs';
import FAQ from '@/pages/faq';
import Chat from '@/pages/chat';
import Notifications from '@/pages/notifications';

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
      {
        path: '/brain/:id',
        element: <Brain />,
      },
      {
        path: '/breast/:id',
        element: <Breast />,
      },
      {
        path: '/lungs/:id',
        element: <Lungs />,
      },
      {
        path: '/faq',
        element: <FAQ />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
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
