import React, { useState, useEffect } from 'react';
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
import useDecodeToken from '../hooks/useDecodeToken';
import queryString from 'query-string';

const ResetPassword = (props) => {
  const {
    history,
    location: { search }
  } = props;
  const { token } = queryString.parse(search);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [error, setError, values] = useDecodeToken(token);
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
      setLoading(true);
      try {
        const res = await axiosClient.put('auth/reset-password', {
          resetPasswordLink: token,
          newPassword: values.password
        });
        setLoading(false);
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage(null);
          history.push('/');
        }, 2000);
      } catch (e) {
        setLoading(false);
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
            ) : message ? (
              <button className="button" type="button" disabled={true}>
                Your password has been reset
              </button>
            ) : (
              <button className="button" type="submit">
                Reset password
              </button>
            )}
          </form>
        </section>
      </section>
    </>
  );
};

export default ResetPassword;
