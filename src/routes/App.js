import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ScrollToTop from '../components/ScrollToTop';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';
import Search from '../containers/Search';
import AccountActivation from '../containers/AccountActivation';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';
import '../assets/styles/App.scss';

export const App = ({ isAuth }) => {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path={[
              '/auth/account-activation',
              '/auth/account-activation/verify'
            ]}
            component={AccountActivation}
          />
          <Route
            exact
            path="/auth/forgot-password"
            component={ForgotPassword}
          />
          <Route exact path="/auth/reset-password" component={ResetPassword} />
          <Route exact path="/404" component={NotFound} />

          {/*Auth Routes*/}

          <Route exact path="/" component={isAuth ? Home : SignIn} />
          <Route
            exact
            path="/player/:id"
            component={isAuth ? Player : SignIn}
          />
          <Route exact path="/search" component={isAuth ? Search : SignIn} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
  );
};
