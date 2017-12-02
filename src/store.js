import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { TRANSIT_API } from '@databraid/transit-widget/lib';
import { GITHUB_API } from '@databraid/github-widget/lib';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware.withExtraArgument({ TRANSIT_API, GITHUB_API })),
  // applyMiddleware(...middleware),
);

export default store;
