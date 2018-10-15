// IMPORT PACKAGE REFERENCES

import fetch from 'isomorphic-fetch';

// INITIALIZATION

export const baseURL = 'http://vm.ml:9000/bus';
const defaultConfig = {
  headers: new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache',
  }),
  mode: 'cors',
  method: 'POST',
  credentials: 'include',
  dataType: 'json',
};

// SERVICES

export const fetchJSON = (route, patchConfig, target) => (params) => {
  const body = JSON.stringify(params || {});
  const config = { ...defaultConfig, ...(patchConfig || {}) };
  const data = config.method === 'POST' ? {...config, body} : config;
  const url = (target || baseURL) + route;
  return new Promise((resolve, reject) => {
    fetch(url, data).then((response) => {
      if (!response.ok) {
        reject(response);
      } else {
        return response.json();
      }
    }).then(json => {
      if (json.success) {
        resolve(json.result);
      } else {
        reject(json);
      }
    }).catch(error => {
      return reject(error);
    });
  });
};
