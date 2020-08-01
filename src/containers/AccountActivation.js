import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// Components
import { isAuth } from '../utils/auth';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../assets/styles/components/SignUp.scss';
import '../assets/styles/containers/ActivateAccount.scss';
import useDecodeToken from '../hooks/useDecodeToken';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccountAction } from '../actions/authActions';

const AccountActivation = (props) => {
  const {
    history,
    location: { search }
  } = props;
  const { token } = queryString.parse(search);
  const message = useSelector((state) => state.auth.message);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [errorToken, setErrorToken, values] = useDecodeToken(token);
  const { name } = values;

  if (token === undefined && message === null) {
    return <Redirect to={'/'} />;
  }

  // This page shows a message to activate account and also show a button when
  // the user has clicked the email to activate their account

  const handleActivateAccount = async () => {
    dispatch(activateAccountAction(token, errorToken, history));
  };
  return (
    <>
      {isAuth() && <Redirect to={'/'} />}
      <Header isAuth />
      <section className="activateAccount">
        <section className="activateAccount__container">
          {message ? (
            <>
              <h3>{message}</h3>
            </>
          ) : (
            <>
              <h2>Hey {name}, ready to activate your account and sign in?</h2>
              {error && (
                // show api errors
                <div className="input__error">
                  <p>{error}</p>
                </div>
              )}
              {loading ? (
                <Spinner />
              ) : (
                <button
                  className="button"
                  type="button"
                  onClick={handleActivateAccount}
                >
                  Activate Account
                </button>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default AccountActivation;
