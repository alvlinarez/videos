import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import '../assets/styles/components/SignUp.scss';

const SignUp = () => {
  const handleInput = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header isAuth />
      <section className="signUp">
        <section className="signUp__container">
          <h2>Sign Up</h2>
          <form className="signUp__container--form" onSubmit={handleSubmit}>
            <input
              name="name"
              className="input"
              type="text"
              placeholder="Name"
              onChange={handleInput}
            />
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Email"
              onChange={handleInput}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
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
