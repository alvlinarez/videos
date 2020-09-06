import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import AccountActivation from '../containers/AccountActivation';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';
import NotFound from '../containers/NotFound';
import Home from '../containers/Home';
import Player from '../containers/Player';
import Search from '../containers/Search';

const serverRoutes = (isAuth) => [
  {
    exact: true,
    path: '/signin',
    component: SignIn
  },
  {
    exact: true,
    path: '/signup',
    component: SignUp
  },
  {
    exact: true,
    path: ['/auth/account-activation', '/auth/account-activation/verify'],
    component: AccountActivation
  },
  {
    exact: true,
    path: '/auth/forgot-password',
    component: ForgotPassword
  },
  {
    exact: true,
    path: '/auth/reset-password',
    component: ResetPassword
  },
  {
    exact: true,
    path: '/',
    component: isAuth ? Home : SignIn
  },
  {
    exact: true,
    path: '/player:id',
    component: isAuth ? Player : SignIn
  },
  {
    exact: true,
    path: '/search',
    component: isAuth ? Search : SignIn
  },
  {
    exact: true,
    path: '/404',
    component: NotFound
  },
  {
    name: 'NotFound',
    component: NotFound
  }
];

export default serverRoutes;
