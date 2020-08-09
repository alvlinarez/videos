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
import '../assets/styles/App.scss';
import Search from '../containers/Search';
import AccountActivation from '../containers/AccountActivation';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from '../actions/authActions';
import RootLoader from '../components/RootLoader';

export const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const authLoading = useSelector((state) => state.auth.authLoading);
  useEffect(() => {
    dispatch(getAuthenticatedUser());
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      {authLoading ? (
        <RootLoader />
      ) : (
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
            <Route
              exact
              path="/auth/reset-password"
              component={ResetPassword}
            />
            <Route exact path="/404" component={NotFound} />
            <AuthenticatedRoutes auth={isAuth}>
              <Route exact path="/" component={Home} />
              <Route exact path="/player/:id" component={Player} />
              <Route exact path="/search" component={Search} />
              <Route component={NotFound} />
            </AuthenticatedRoutes>
          </Switch>
        </Layout>
      )}
    </BrowserRouter>
  );
};
