import 'babel-polyfill';
import path from 'path';
import express from 'express';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
/**
 * if export default Home in Home.js file
 *      const Home = require('./client/components/Home').default;
 */ 

const app = express();
const PORT = process.env.PORT || 6060;

app.use(
  '/api',
  proxy('https://manish-api-server.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'manish-canvas.herokuapp.com';
      return opts;
    }
  })
);
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
