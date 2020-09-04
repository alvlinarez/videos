import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Dispatch
import { useSelector, useDispatch } from 'react-redux';
// Action
import { signUpAction } from '../actions/authActions';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import signInStyles from '../styles/containers/SignIn.module.scss';
import signUpStyles from '../styles/containers/SignUp.module.scss';

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Email invalid').required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must contain at least 6 characters')
    }),
    onSubmit: (values) => {
      // dispatch form values to state to sign up
      dispatch(signUpAction(values, router));
    }
  });

  // // If user is already signed in
  // const isAuth = useSelector((state) => state.auth.isAuth);
  // if (isAuth) {
  //   return <Redirect to={'/'} />;
  // }

  return (
    <>
      <Header authBackgroundColor />
      <section className={`${signUpStyles.signUp}`}>
        <section className={`${signUpStyles.signUpContainer}`}>
          <h2>Sign Up</h2>
          <form
            className={`${signUpStyles.signUpContainerForm}`}
            onSubmit={formik.handleSubmit}
          >
            <input
              name="name"
              className={`${signInStyles.input}`}
              type="text"
              placeholder="Name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={`${signInStyles.inputError}`}>
                <p>{formik.errors.name}</p>
              </div>
            )}
            <input
              name="email"
              className={`${signInStyles.input}`}
              type="text"
              placeholder="Email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
              <button className="button" type="submit">
                Sign Up
              </button>
            )}
          </form>
          <p className={`${signUpStyles.signUpContainerSignIn}`}>
            Already have an account?{' '}
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default SignUp;
