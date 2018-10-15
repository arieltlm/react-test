// IMPORT PACKAGE REFERENCES
import path from 'path';

// IMPORT PROJECT REFERENCES

import {fetchJSON} from '../utils/Fetch';

// SERVICES
const engineUrl = 'http://vm.ml:8888/api';

const _fetchSessions = fetchJSON('/sessions', {method: 'GET'}, engineUrl);
const _startSession = fetchJSON(path.join('/sessions'), {}, engineUrl);
const _closeSession = (sessionId) => {
  return fetchJSON(path.join('/sessions', sessionId), {method: 'DELETE'}, engineUrl);
};
const _fetchSession = (sessionId) => {
  return fetchJSON(path.join('/sessions', sessionId), {method: 'GET'}, engineUrl);
};

export const fetchSessions = _fetchSessions;
export const fetchSession = _fetchSession;
export const startSession = (sessionModel) => {
  return _startSession(sessionModel);
};
export const closeSession = _closeSession;
