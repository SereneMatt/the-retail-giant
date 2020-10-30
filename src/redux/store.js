import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// middlewares between actions and reducers
const middlewares = [logger];

// applyMiddleware is thereturn value
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
