import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';



import { createBrowserRouter, Outlet, RouterProvider, useParams } from 'react-router-dom';

import Logo from './components/Logo';
import EmailVerification from './components/EmailVerification';
import ProfileScreen from './components/profile/ProfileScreen';
import SignIn from './components/login/SignIn';
import VerificationPage from './components/VerificationPage';
import { useUserStore } from './store/userStore';
import Logout from './components/profile/Logout';
import Navbar from './components/Navbar';
import Register from './components/login/Register';
const Root = ({
  children
}) => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [


      {
        path: '/',
        element: <App />,
    
      },
      {
        path: '/register',
        element: <Register />,
    
      },
      {
        path: '/signin',
        element: <SignIn />,
    
      },
      {
        path: '/verify/:id',
        element: <EmailVerification />
      },
      {
        path: '/verification_page',
        element: <VerificationPage />
      },
      {
        path: '/profile',
        element: <ProfileScreen />
      }
    ],

  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <RouterProvider router={router}>


    </RouterProvider>
  </React.StrictMode>
);

