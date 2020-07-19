import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './assets/styles/App.scss';
import SignIn from './containers/SignIn';
import Layout from './components/Layout';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={SignIn} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
