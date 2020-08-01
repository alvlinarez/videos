import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import Layout from '../components/Layout';
import ScrollToTop from '../components/ScrollToTop';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';
import '../assets/styles/App.scss';
import Search from '../containers/Search';
import Oauth from '../containers/Oauth';
import AccountActivation from '../containers/AccountActivation';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/auth/oauth" component={Oauth} />
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
            <Route
              exact
              path="/auth/reset-password"
              component={ResetPassword}
            />
            <AuthenticatedRoutes>
              <Route exact path="/" component={Home} />
              <Route exact path="/player/:id" component={Player} />
              <Route exact path="/search" component={Search} />
            </AuthenticatedRoutes>
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};
