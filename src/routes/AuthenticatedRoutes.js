import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoutes = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
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
