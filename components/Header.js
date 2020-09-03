import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../actions/authActions';

import '../styles/components/Header.scss';
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
        <img
          className="header__img"
          src="/static/logo-video.png"
          alt="Videos"
        />
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
              <Link to="#logout" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
