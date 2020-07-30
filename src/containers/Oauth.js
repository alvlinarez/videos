import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { signInOauthAction } from '../actions/authActions';
import { isAuth } from '../utils/auth';

const Oauth = (props) => {
  // if user is already signed in, redirect to home
  if (isAuth()) return <Redirect to={'/'} />;
  // get token from url params
  const { token } = queryString.parse(props.location.search);
  const dispatch = useDispatch();
  // if token exists, sign the user in
  if (token) dispatch(signInOauthAction(token));
  return <Redirect to={'/'} />;
};

export default Oauth;
