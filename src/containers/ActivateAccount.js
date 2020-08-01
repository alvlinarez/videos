import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// Components
import { isAuth } from '../utils/auth';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { axiosClient } from '../config/axios';
import '../assets/styles/components/SignUp.scss';
import '../assets/styles/containers/ActivateAccount.scss';
import useDecodeToken from '../hooks/useDecodeToken';
import queryString from 'query-string';

const ActivateAccount = (props) => {
  const {
    history,
    location: { search }
  } = props;
  const { token } = queryString.parse(search);
  const [error, setError, values] = useDecodeToken(token);
  const { name } = values;
  const [loading, setLoading] = useState(false);

  const handleActivateAccount = async () => {
    setLoading(true);
    try {
      await axiosClient.post('auth/account-activation', {
        token
      });
      setLoading(false);
      setError(null);
      history.push('/signin');
    } catch (e) {
      setLoading(false);
      setError(e.response.data.error);
    }
  };
  return (
    <>
      {isAuth() && <Redirect to={'/'} />}
      <Header isAuth />
      <section className="activateAccount">
        <section className="activateAccount__container">
          {error ? (
            <div className="activateAccount__container-error">
              <h2>Error</h2>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <h2>Hey {name}, ready to activate your account and sign in?</h2>
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

export default ActivateAccount;
