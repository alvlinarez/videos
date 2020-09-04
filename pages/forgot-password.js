import React, { useState } from 'react';
import Link from 'next/link';

// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import forgotPasswordStyles from '../styles/containers/ForgotPassword.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../actions/authActions';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Email invalid').required('Email is required')
    }),
    onSubmit: async (values) => {
      dispatch(forgotPasswordAction(values, router));
    }
  });

  // If user is already signed in
  // const isAuth = useSelector((state) => state.auth.isAuth);
  // if (isAuth) {
  //   return <Redirect to={'/'} />;
  // }

  return (
    <>
      <Header authBackgroundColor />
      <section className={`${forgotPasswordStyles.forgotPassword}`}>
        <section className={`${forgotPasswordStyles.forgotPasswordContainer}`}>
          {message ? (
            <>
              <h3>{message}</h3>
            </>
          ) : (
            <>
              <h2>Forgot Password</h2>
              <form
                className={`${forgotPasswordStyles.forgotPasswordContainerForm}`}
                onSubmit={formik.handleSubmit}
              >
                <input
                  name="email"
                  className="input"
                  type="text"
                  placeholder="Email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={message || false}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="input__error">
                    <p>{formik.errors.email}</p>
                  </div>
                )}
                {error && (
                  // show api errors
                  <div
                    className={`${forgotPasswordStyles.forgotPasswordContainerFormError}`}
                  >
                    <p>{error}</p>
                  </div>
                )}
                {loading ? (
                  <Spinner />
                ) : (
                  <button className="button" type="submit">
                    Request password reset link
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

export default ForgotPassword;
