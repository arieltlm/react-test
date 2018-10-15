
// IMPORT PROJECT REFERENCES

import {fetchJSON} from '../utils/Fetch';

// SERVICES

export const fetchRuns = fetchJSON('/run/list');

export const deleteRun = fetchJSON('/run/delete');


