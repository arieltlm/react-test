// IMPORT PACKAGE REFERENCES

import { createStore } from 'redux';
import AppReducer from './reducer';

// import {increment, descement} from './reducer';
// CONFIGURE STORE

const createAppStore = () => {
  return createStore(AppReducer);
//   return createStore(combineReducers({AppReducer,TodoReducer}));
};


// 多个reducer时需要使用combineReducers合起来
// import { combineReducers } from 'redux';
// combineReducers({increment, descement})
// createStore的第一个参数需要是reducer
export default createAppStore;