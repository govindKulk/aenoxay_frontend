import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

import {createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';
import Login from './components/login/Login';
import Logo from './components/Logo';
import EmailVerification from './components/EmailVerification';
import ProfileScreen from './components/profile/ProfileScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <div className='bg-red-100/30 font-bold text-black text-3xl flex justify-center items-center min-h-screen flex-col '>Page Not Found <br/> <p className='text-4xl font-bold text-black/50'> 404 </p> </div>
  },
  {
    path: '/login',
    element: <Login/>,

  },
  {
    path: './verify-email',
    element: <EmailVerification/>
  },
  {
    path: '/profile',
    element: <ProfileScreen/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>

    <RouterProvider router={router}/>
  </React.StrictMode>
);

