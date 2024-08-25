import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import adminReducer from '../reducers/adminReducer';

import transactionReducer from '../reducers/transactionReducer';

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  transaction: transactionReducer
});

// Setup Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : compose;

// Create the Redux store with DevTools extension and middleware enabled
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
