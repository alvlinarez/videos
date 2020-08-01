import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInOauthAction } from '../actions/authActions';
import { getCookie, isAuth } from '../utils/auth';

const Oauth = () => {
  // if user is already signed in, redirect to home
  if (isAuth()) return <Redirect to={'/'} />;
  const dispatch = useDispatch();

  useEffect(() => {
    // get token from cookies
    const token = getCookie('token');
    // if token exists, sign the user in
    if (token) dispatch(signInOauthAction(token));
  }, []);

  return <Redirect to={'/'} />;
};

export default Oauth;
