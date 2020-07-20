import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/SignIn.scss';
import googleIcon from '../assets/static/google-icon.png';
import facebookIcon from '../assets/static/facebook-icon.png';
import Header from '../components/Header';

const SignIn = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <>
      <Header isAuth />
      <section className="signIn">
        <section className="signIn__container">
          <h2>Sign In</h2>
          <form className="signIn__container--form" onSubmit={handleSubmit}>
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
              Sign In
            </button>
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
