import { createStore } from 'redux';

const express = require('express');
const compression = require('compression');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { getManifest } = require('./server/getManifest');

import reducer from './src/reducers';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serverRoutes from './src/routes/serverRoutes';
import { getInitialState } from './server/initialState';

const app = express();

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  if (!req.hashManifest) {
    req.hashManifest = getManifest();
  }
  next();
});

// serving static build file that it will be built with npm run build
app.use(express.static(path.join(__dirname, 'dist')));

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest && manifest['main.css'];
  const mainBuild = manifest && manifest['main.js'];
  const vendorBuild = manifest && manifest['vendors.js'];

  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <link rel="stylesheet" href="${mainStyles}" type="text/css" media="all" aria-disabled="false"/>
          <link rel="preconnect" href="https://aws-alg-drive.s3.amazonaws.com" />
          <link rel="icon" type="image/x-icon" href="https://aws-alg-drive.s3.amazonaws.com/videos-logo.ico">
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Website to watch movies and save playlists. Made with MERN">
          <title>Videos</title>
      </head>
      <body>
          <div id="app">${html}</div>
          <script type="text/javascript">
            window.__PRELOADED_STATE__ = ${JSON.stringify(
              preloadedState
            ).replace(/</g, '\\u003c')}
           </script>
          <script src="${mainBuild}" type="text/javascript"></script>
          <script src="${vendorBuild}" type="text/javascript"></script>
      </body>
      </html>
  `;
};

const renderApp = async (req, res) => {
  let initialState = await getInitialState(req.cookies.token);

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const context = {};
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(serverRoutes(initialState.auth.isAuth))}
      </StaticRouter>
    </Provider>
  );

  res.send(setResponse(html, preloadedState, req.hashManifest));
};

require('./server/strategies/google');
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile', 'openid'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        error: `Error signing in with Google`
      });
    }
    const { token } = req.user;
    res.cookie('token', token, {
      httpOnly: true,
      secure: false
    });
    return res.redirect('/');
  }
);

require('./server/strategies/facebook');
app.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        error: `Error signing in with Facebook`
      });
    }
    const { token } = req.user;
    res.cookie('token', token, {
      httpOnly: true,
      secure: false
    });
    return res.redirect('/');
  }
);

app.get('*', renderApp);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
