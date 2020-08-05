import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInOauthAction } from '../actions/authActions';
import { getCookie, isAuth } from '../utils/auth';
import axios from 'axios';

const Oauth = () => {
  // if user is already signed in, redirect to home
  if (isAuth()) return <Redirect to={'/'} />;
  const dispatch = useDispatch();

  useEffect(async () => {
    // get token from cookies
    const token = getCookie('token');
    try {
      const token2 = await axios.get('http://localhost:5000/api/auth/user', {
        withCredentials: true
      });
      console.log(token2);
      // const auth = await axios.get('http://localhost:5000/api/auth/test', {
      //   withCredentials: true
      // });
      // console.log(auth);
    } catch (e) {
      console.log(e);
    }
    // if token exists, sign the user in
    if (token) dispatch(signInOauthAction(token));
  }, []);

  //return <Redirect to={'/'} />;
  return <></>;
};

export default Oauth;
