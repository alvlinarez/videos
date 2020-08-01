import React from 'react';
import { Link, Redirect } from 'react-router-dom';
// Dispatch
import { useSelector, useDispatch } from 'react-redux';
// Action
import { signUpAction } from '../actions/authActions';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Components
import { isAuth } from '../utils/auth';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../assets/styles/components/SignUp.scss';

const SignUp = (props) => {
  const { history } = props;
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
      dispatch(signUpAction(values, history));
    }
  });

  return (
    <>
      {isAuth() && <Redirect to={'/'} />}
      <Header isAuth />
      <section className="signUp">
        <section className="signUp__container">
          <h2>Sign Up</h2>
          <form
            className="signUp__container--form"
            onSubmit={formik.handleSubmit}
          >
            <input
              name="name"
              className="input"
              type="text"
              placeholder="Name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="input__error">
                <p>{formik.errors.name}</p>
              </div>
            )}
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
                Sign Up
              </button>
            )}
          </form>
          <p className="signUp__container--signIn">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default SignUp;
