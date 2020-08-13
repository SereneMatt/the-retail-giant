import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// middlewares between actions and reducers
const middlewares = [logger];

// applyMiddleware is thereturn value
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
