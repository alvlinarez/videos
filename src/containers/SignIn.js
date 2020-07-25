import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Dispatch
import { useSelector, useDispatch } from 'react-redux';
// Form
import { useFormik } from 'formik';
// Validator
import * as yup from 'yup';
// Actions
import { signInAction } from '../actions/authActions';
// Components
import Spinner from '../components/Spinner';

import '../assets/styles/components/SignIn.scss';
import googleIcon from '../assets/static/google-icon.png';
import facebookIcon from '../assets/static/facebook-icon.png';
import Header from '../components/Header';

const SignIn = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

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
      dispatch(signInAction(values, history));
    }
  });

  return (
    <>
      <Header isAuth />
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
              <a href="/">Forgot your password?</a>
            </div>
          </form>
          <section className="signIn__container--social-media">
            <div>
              <img src={googleIcon} alt="Google-Icon" />
              <span>Sign In with Google</span>
            </div>
            <div>
              <img src={facebookIcon} alt="Twitter-Icon" />
              <span>Sign In with Facebook</span>
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
