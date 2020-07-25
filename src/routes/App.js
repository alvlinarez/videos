import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import Layout from '../components/Layout';
import ScrollToTop from '../components/ScrollToTop';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';
import '../assets/styles/App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/player/:id" component={Player} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};
