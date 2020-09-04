import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../actions/authActions';

import headerStyles from '../styles/components/Header.module.scss';
import gravatar from '../utils/gravatar';

const Header = (props) => {
  const { authBackgroundColor } = props; // if page is related to auth to add class
  const headerClass = authBackgroundColor
    ? headerStyles.headerAuthBackgroundColor
    : '';
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const handleSignOut = () => {
    dispatch(signOutAction());
  };

  return (
    <header className={`${headerStyles.header} ${headerClass}`}>
      <Link href="/">
        <a>
          <img
            className={`${headerStyles.headerImg}`}
            src="/static/logo-video.png"
            alt="Videos"
          />
        </a>
      </Link>
      {isAuth && (
        <div className={`${headerStyles.headerMenu}`}>
          <div className={`${headerStyles.headerMenuProfile}`}>
            <img src={gravatar(user.email)} alt={user.email} />
            <p>Profile</p>
          </div>
          <ul>
            <li>
              <a href="/">{user.name}</a>
            </li>
            <li>
              <Link href="#logout" onClick={handleSignOut}>
                <a>Sign Out</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
