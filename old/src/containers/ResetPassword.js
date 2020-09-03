import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../assets/styles/containers/ForgotPassword.scss';
import { axiosClient } from '../config/axios';
import useDecodeToken from '../hooks/useDecodeToken';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../actions/authActions';

const ResetPassword = (props) => {
  const {
    history,
    location: { search }
  } = props;

  const { token } = queryString.parse(search);
  if (token === undefined) {
    return <Redirect to={'/'} />;
  }
  const loading = useSelector((state) => state.auth.loading);
  const message = useSelector((state) => state.auth.message);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const [errorToken, values] = useDecodeToken(token);
  const { name } = values;

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must contain at least 6 characters')
    }),
    onSubmit: async (values) => {
      dispatch(
        resetPasswordAction(errorToken, token, values.password, history)
      );
    }
  });

  // If user is already signed in
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Redirect to={'/'} />;
  }

  return (
    <>
      <Header authBackgroundColor />
      <section className="forgotPassword">
        <section className="forgotPassword__container">
          {message ? (
            <>
              <h3>{message}</h3>
            </>
          ) : (
            <>
              <h2>Hey {name}, type your new password</h2>
              <form
                className="forgotPassword__container--form"
                onSubmit={formik.handleSubmit}
              >
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder="New Password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={message || false}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="input__error">
                    <p>{formik.errors.password}</p>
                  </div>
                )}
                {error && (
                  // show api errors
                  <div className="input__error">
                    <p>{error}</p>
                  </div>
                )}
                {loading ? (
                  <Spinner />
                ) : (
                  <button className="button" type="submit">
                    Reset password
                  </button>
                )}
              </form>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default ResetPassword;
