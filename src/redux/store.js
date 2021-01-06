import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// middlewares between actions and reducers
const middlewares = [thunk];

// Log only in development environment
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// applyMiddleware is thereturn value
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
