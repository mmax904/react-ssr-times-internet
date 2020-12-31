// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import StyleContext from 'isomorphic-style-loader/StyleContext'

import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api'
});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
    <StyleContext.Provider value={{ insertCss }}>
      {renderRoutes(Routes)}
    </StyleContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
