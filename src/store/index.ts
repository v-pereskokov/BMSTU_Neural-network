import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {logger} from '../middleware';
import thunk from 'redux-thunk';
import rootReducer from '../redux/index';

export function configureStore(initialState = {}) {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    module.hot.accept('../redux', () => {
      const nextReducer = require('../redux/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
