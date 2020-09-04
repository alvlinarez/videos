import React from 'react';
import Link from 'next/link';
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
import signInStyles from '../styles/containers/SignIn.module.scss';

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
  // const isAuth = useSelector((state) => state.auth.isAuth);
  // if (isAuth) {
  //   return <Redirect to={'/'} />;
  // }

  return (
    <>
      <Header authBackgroundColor />
      <section className={`${signInStyles.signIn}`}>
        <section className={`${signInStyles.signInContainer}`}>
          <h2>Sign In</h2>
          <form
            className={`${signInStyles.signInContainerForm}`}
            onSubmit={formik.handleSubmit}
          >
            <input
              name="email"
              className={`${signInStyles.input}`}
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={`${signInStyles.inputError}`}>
                <p>{formik.errors.email}</p>
              </div>
            )}
            <input
              name="password"
              className={`${signInStyles.input}`}
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={`${signInStyles.inputError}`}>
                <p>{formik.errors.password}</p>
              </div>
            )}
            {error && (
              // show api errors
              <div className={`${signInStyles.inputError}`}>
                <p>{error}</p>
              </div>
            )}
            {loading ? (
              <Spinner />
            ) : (
              <button className={`${signInStyles.button}`} type="submit">
                Sign In
              </button>
            )}
            <div className={`${signInStyles.signInContainerForgotPassword}`}>
              <Link href="/auth/forgot-password">
                <a>Forgot your password?</a>
              </Link>
            </div>
          </form>
          <section className={`${signInStyles.signInContainerSocialMedia}`}>
            <div>
              <img src="/static/google-icon.png" alt="Google-Icon" />
              <a href="/auth/google">Sign In with Google</a>
            </div>
            <div>
              <img src="/static/facebook-icon.png" alt="Facebook-Icon" />
              <a href="/auth/facebook">Sign In with Facebook</a>
            </div>
          </section>
          <p className={`${signInStyles.signInContainerSignUp}`}>
            Don&apos;t you have an account?{' '}
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default SignIn;
