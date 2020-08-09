import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { noAuthRoutes } from './noAuthRoutes';

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
              // if the route is not registered in the array would give a 404
              pathname: noAuthRoutes.includes(location.pathname)
                ? '/signin'
                : '/404',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoutes;
