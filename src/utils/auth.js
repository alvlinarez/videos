import cookie from 'js-cookie';
import parseJwt from './parseJwt';

// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 14 // expires in 14 days
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key);
  }
};

// get from cookie such as stored token
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalstorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalstorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage
// during sign in
export const authenticate = (token, user) => {
  setCookie('token', token);
  setLocalstorage('user', user);
};

// When user signed in by google or facebook
export const signInOauth = (token) => {
  const { sub: id, name, email, error } = parseJwt(token);
  const user = {
    id,
    name,
    email
  };
  if (!error) {
    authenticate(token, user);
    return { token, user };
  }
  return null;
};

// access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

// sign out
export const signOut = () => {
  removeCookie('token');
  removeLocalstorage('user');
};
