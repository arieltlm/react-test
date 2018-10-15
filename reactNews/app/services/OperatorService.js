
// IMPORT PROJECT REFERENCES

import {fetchJSON} from '../utils/Fetch';

// SERVICES

const _fetchOperators = fetchJSON('/operator/list');

export const fetchOperators = (sortBy) => {
  return sortBy ? _fetchOperators({sortBy}) : _fetchOperators({sortBy: null});
};

export const createOperators = fetchJSON('/operator/create');