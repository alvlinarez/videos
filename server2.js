import { axiosClient } from './src/config/axios';
import { createStore } from 'redux';

const express = require('express');
const compression = require('compression');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const { getManifest } = require('./server/getManifest');

import reducer from './src/reducers';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { App } from './src/routes/App';

const app = express();

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(cors());
//app.use(helmet());
//app.use(helmet.permittedCrossDomainPolicies());

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
  const vendorBuild = manifest && manifest['vendors~main.js'];

  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <link rel="stylesheet" href="${mainStyles}" type="text/css" media="all" aria-disabled="false"/>
          <link rel="preconnect" href="https://aws-alg-drive.s3.amazonaws.com" />
          <link rel="preconnect" href="http://localhost:5000" />
          <meta charset="UTF-8">
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
  let initialState = {
    search: {
      error: null,
      loading: false,
      search: null
    }
  };
  const { email, name, id } = req.cookies;
  try {
    let movies = await axiosClient().get('movies');
    movies = movies.data;
    const originals = movies.filter((movie) => movie.original);
    // Get first 7 most watched movies
    const mostWatched = [
      ...movies
        .sort(function compare(a, b) {
          if (a.timesWatched < b.timesWatched) {
            return 1;
          }
          if (a.timesWatched > b.timesWatched) {
            return -1;
          }
          return 0;
        })
        .slice(0, 7)
    ];

    let playlist = await axiosClient().get('playlists/byUser');
    playlist = playlist.data.movies;
    initialState = {
      ...initialState,
      auth: {
        user: {
          id,
          name,
          email
        },
        authLoading: true,
        error: null,
        isAuth: true,
        loading: false,
        message: null
      },
      movies: {
        error: null,
        loading: true,
        mostWatched,
        movies,
        originals,
        playing: {}
      },
      playlist: {
        error: null,
        loading: false,
        playlist
      }
    };
  } catch (e) {
    initialState = {
      ...initialState,
      auth: {
        user: {},
        authLoading: true,
        error: null,
        isAuth: false,
        loading: false,
        message: null
      },
      movies: {
        error: null,
        loading: true,
        mostWatched: null,
        movies: null,
        originals: null,
        playing: {}
      },
      playlist: {
        error: null,
        loading: false,
        playlist: null
      }
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <App />
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

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.get('*', renderApp);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  getManifest();
  console.log(`App is running on port ${PORT}`);
});
