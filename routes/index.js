// types: 1 -> Protected routes || 2 -> Public routes
export const routes = [
  {
    path: '/',
    type: 1
  },
  {
    path: '/player',
    type: 1
  },
  {
    path: '/search',
    type: 1
  },
  {
    path: '/signin',
    type: 2
  },
  {
    path: '/signup',
    type: 2
  },
  {
    path: '/account-activation',
    type: 2
  },
  {
    path: '/forgot-password',
    type: 2
  },
  {
    path: '/not-found',
    type: 2
  },
  {
    path: '/reset-password',
    type: 2
  }
];
