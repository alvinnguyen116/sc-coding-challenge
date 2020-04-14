import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import finalReducer from './reducers/index';

// todo: remove logger in production
const middleware = applyMiddleware(logger,thunk);

export default createStore(finalReducer, middleware);