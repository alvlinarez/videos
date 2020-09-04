import React from 'react';
import App from 'next/app';
import { wrapper } from '../store';
import { routes } from '../routes';
import { axiosClient } from '../config/axios';
import { redirectUser } from '../routes/redirectUser';
import NotFound from './not-found';

import '../styles/App.scss';
import '../styles/Media.scss';
import '../styles/Vars.scss';

import '../styles/swiper/swiper.scss';
import '../styles/swiper/scrollbar/scrollbar.scss';
import '../styles/components/Carousel.scss';
import { getToken } from '../utils/getToken';

const MyApp = ({ Component, pageProps }) => {
  const { user, error } = pageProps;
  if (error) {
    return <NotFound error={error} />;
  }
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async (appContext) => {
  const {
    ctx,
    ctx: { req }
  } = appContext;
  let user = {},
    error = null;
  if (req) {
    const token = getToken(req.headers.cookie);
    if (token) {
      try {
        const { data } = await axiosClient().post('auth', { token });
        user = data.user || {};
      } catch (e) {
        error = { statusCode: 501 };
      }
    }
    // Verify if url pathname exists
    const route = routes.find((item) => item.path === ctx.pathname);
    if (!route) {
      error = { statusCode: 404 };
    } else {
      // If user is not signed in, redirect to signin page or 404
      if (Object.keys(user).length <= 0) {
        route.type === 1 && redirectUser(ctx, '/signin');
      } else {
        // If user is signed in, redirect to home or 404
        route.type === 2 && redirectUser(ctx, '/');
      }
    }
  }
  const appProps = await App.getInitialProps(appContext);
  // Adding user to props
  appProps.pageProps.error = error;
  appProps.pageProps.user = user;
  // If no auth user and is a protected route, redirect to signin
  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
