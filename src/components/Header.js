import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../actions/authActions';

import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-video.png';
import gravatar from '../utils/gravatar';

const Header = (props) => {
  const { authBackgroundColor } = props; // if page is related to auth to add class
  const headerClass = authBackgroundColor ? 'header-authBackgroundColor' : '';
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const handleSignOut = () => {
    dispatch(signOutAction());
  };

  return (
    <header className={`header ${headerClass}`}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Videos" />
      </Link>
      {isAuth && (
        <div className="header__menu">
          <div className="header__menu--profile">
            <img src={gravatar(user.email)} alt={user.email} />
            <p>Profile</p>
          </div>
          <ul>
            <li>
              <a href="/">{user.name}</a>
            </li>
            <li>
              <a onClick={handleSignOut}>Sign Out</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
