import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRouter } from 'next/router';
// Dispatch
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { signInAction } from '../actions/authActions';
// Form
import { useFormik } from 'formik';
// Validator
import * as yup from 'yup';
// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../styles/components/SignIn.scss';

const SignIn = () => {
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Email invalid').required('Email is required'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
      // dispatch form values to state to sign in
      dispatch(signInAction(values, router));
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
      <section className="signIn">
        <section className="signIn__container">
          <h2>Sign In</h2>
          <form
            className="signIn__container--form"
            onSubmit={formik.handleSubmit}
          >
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="input__error">
                <p>{formik.errors.email}</p>
              </div>
            )}
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
                Sign In
              </button>
            )}
            <div className="signIn__container--forgot-password">
              <Link to="/auth/forgot-password">Forgot your password?</Link>
            </div>
          </form>
          <section className="signIn__container--social-media">
            <div>
              <img src="/static/google-icon.png" alt="Google-Icon" />
              <a href="/auth/google">Sign In with Google</a>
            </div>
            <div>
              <img src="/static/facebook-icon.png" alt="Facebook-Icon" />
              <a href="/auth/facebook">Sign In with Facebook</a>
            </div>
          </section>
          <p className="signIn__container--signUp">
            Don&apos;t you have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default SignIn;
