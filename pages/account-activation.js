import React from 'react';
import { useRouter } from 'next/router';
// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import activateAccountStyles from '../styles/containers/ActivateAccount.module.scss';
import useDecodeToken from '../hooks/useDecodeToken';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccountAction } from '../actions/authActions';

const AccountActivation = (props) => {
  const router = useRouter();
  const {
    location: { search }
  } = props;
  const { token } = queryString.parse(search);
  const message = useSelector((state) => state.auth.message);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const [errorToken, values] = useDecodeToken(token);
  const { name } = values;

  // If user is already signed in
  // const isAuth = useSelector((state) => state.auth.isAuth);
  // if (isAuth) {
  //   return <Redirect to={'/'} />;
  // }
  //
  // if (token === undefined && message === null) {
  //   return <Redirect to={'/'} />;
  // }

  // This page shows a message to activate account and also show a button when
  // the user has clicked the email to activate their account

  const handleActivateAccount = async () => {
    dispatch(activateAccountAction(errorToken, token, router));
  };
  return (
    <>
      <Header authBackgroundColor />
      <section className={`${activateAccountStyles.activateAccount}`}>
        <section
          className={`${activateAccountStyles.activateAccountContainer}`}
        >
          {message ? (
            <>
              <h3>{message}</h3>
            </>
          ) : (
            <>
              <h2>Hey {name}, ready to activate your account and sign in?</h2>
              {error && (
                // show api errors
                <div
                  className={`${activateAccountStyles.activateAccountContainerError}`}
                >
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
