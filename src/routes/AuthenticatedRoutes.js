import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../utils/auth';

const AuthenticatedRoutes = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoutes;
