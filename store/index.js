import {applyMiddleware, createStore} from 'redux';
import { reducers } from '../reducers/index'
//RN debugger
import logger from 'redux-logger'
//new reactNavigation beta 28 changes
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const store = createStore(reducers, applyMiddleware(logger, middleware));

export default store;
