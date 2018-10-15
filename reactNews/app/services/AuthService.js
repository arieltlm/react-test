
// IMPORT PROJECT REFERENCES

import {fetchJSON} from '../utils/Fetch';

// SERVICES

export const login = fetchJSON('/login');

export const logout = fetchJSON('/logout');
