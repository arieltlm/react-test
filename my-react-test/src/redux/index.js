// IMPORT PACKAGE REFERENCES

import {createStore} from 'redux';
import AppReducer from './reducer';
// CONFIGURE STORE

const createAppStore = () => {
  return createStore(AppReducer);
};

export default createAppStore;