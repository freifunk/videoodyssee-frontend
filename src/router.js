import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );




const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);

const Form = Loader(
  lazy(() => import('src/content/applications/Form'))
);


const LoginForm = Loader(
  lazy(() => import('src/content/applications/LoginForm'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);


const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Form />
      },
      {
        path: '/dashboard/login',
        element: !localStorage.getItem("x-token")? <LoginForm /> : <Navigate to="/dashboard" />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboard',
    element: localStorage.getItem("x-token") ?<SidebarLayout /> : <Navigate to="/dashboard/login" /> ,
    children: [
      {
        path: '',
        element: <Navigate to="videos" replace />
      },
      {
        path: 'videos',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  
];

export default routes;
