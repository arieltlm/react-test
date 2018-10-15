
// IMPORT PROJECT REFERENCES


// SERVICES

import {fetchJSON} from '../utils/Fetch';

export const fetchUsers = fetchJSON('/user/list');

export const fetchCurrentUser = fetchJSON('/user/info', {method: 'GET'});

export const createUser = fetchJSON('/user/create');

export const deleteUser = fetchJSON('/user/delete');

export const updateUser = fetchJSON('/user/update');



