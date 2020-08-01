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

const ForgotPassword = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Email invalid').required('Email is required')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axiosClient.put('auth/forgot-password', {
          email: values.email
        });
        setLoading(false);
        setError(null);
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage(null);
          history.push('/');
        }, 3000);
      } catch (e) {
        setError(e.response.data.error);
      }
    }
  });

  return (
    <>
      {isAuth() && <Redirect to={'/'} />}
      <Header isAuth />
      <section className="forgotPassword">
        <section className="forgotPassword__container">
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
            ) : message ? (
              <button className="button" type="button" disabled={true}>
                Reset link has been sent
              </button>
            ) : (
              <button className="button" type="submit">
                Request password reset link
              </button>
            )}
          </form>
        </section>
      </section>
    </>
  );
};

export default ForgotPassword;
