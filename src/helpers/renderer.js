import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => {
    return styles ? styles.forEach(style => css.add(style._getCss())) : [];
  };
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <StyleContext.Provider value={{ insertCss }}>
          {renderRoutes(Routes)}
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js" defer></script>
      </body>
    </html>
  `;
};
