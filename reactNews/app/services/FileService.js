// IMPORT PROJECT REFERENCES


import {fetchJSON} from '../utils/Fetch';

// SERVICES

export const fetchFileNames = fetchJSON('/fs/getFileList');

