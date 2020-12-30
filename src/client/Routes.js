import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DrawingPage from './pages/DrawingPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...DrawingPage,
        path: '/draw'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
