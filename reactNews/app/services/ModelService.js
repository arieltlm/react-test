
// IMPORT PROJECT REFERENCES

import {fetchJSON} from '../utils/Fetch';

// SERVICES

export const fetchModels = fetchJSON('/model/list');
export const deleteModels = fetchJSON('/model/delete');



