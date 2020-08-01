import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Components
import { isAuth } from '../utils/auth';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../assets/styles/containers/ForgotPassword.scss';
import { axiosClient } from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../actions/authActions';

const ForgotPassword = (props) => {
  const { history } = props;
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
      dispatch(forgotPasswordAction(values, history));
    }
  });

  return (
    <>
      {isAuth() && <Redirect to={'/'} />}
      <Header isAuth />
      <section className="forgotPassword">
        <section className="forgotPassword__container">
          {message ? (
            <>
              <h3>{message}</h3>
            </>
          ) : (
            <>
              <h2>Forgot Password</h2>
              <form
                className="forgotPassword__container--form"
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
                  <div className="input__error">
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
