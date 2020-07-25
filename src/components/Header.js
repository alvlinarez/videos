import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../actions/authActions';

import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-video.png';
import gravatar from '../utils/gravatar';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { isAuth } = props; // if page is sign in or sign up to add class
  const headerClass = isAuth ? 'isAuth' : '';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleSignOut = (e) => {
    dispatch(signOutAction());
  };

  return (
    <header className={`header ${headerClass}`}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Videos" />
      </Link>
      {!isAuth && (
        <div className="header__menu">
          <div className="header__menu--profile">
            {user ? (
              <img src={gravatar(user.email)} alt={user.email} />
            ) : (
              <img src={userIcon} alt="user-icon" />
            )}
            <p>Profile</p>
          </div>
          <ul>
            {user ? (
              <>
                <li>
                  <a href="/">{user.name}</a>
                </li>
                <li>
                  <Link to="#logout" onClick={handleSignOut}>
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
