import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import List from './components/List';
import Settings from './pages/Settings';
import Calls from './pages/Calls';
import Add from './pages/Add';
import MyProfile from './pages/MyProfile';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <List />,
      },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <div>Contact profile</div> },
      { path: 'calls', element: <Calls /> },
      { path: 'add', element: <Add /> },
      { path: 'myprofile', element: <MyProfile /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
