import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

import reducer from './reducers';

const makeStore = (context) =>
  createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      typeof window === 'object' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
export const wrapper = createWrapper(makeStore, { debug: true });
