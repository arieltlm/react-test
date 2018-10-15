// IMPORT PROJECT REFERENCES


import {fetchJSON} from '../utils/Fetch';

// SERVICES

const _fetchProject = fetchJSON('/project/show');
export const fetchProjects = fetchJSON('/project/list');
const _updateProject = fetchJSON('/project/update');

export const createProject = fetchJSON('/project/create');

export const deleteProject = fetchJSON('/project/delete');


export const fetchProject = (id) => {
  return id ? _fetchProject({id}) : _fetchProject({id: null});
};

// export const fetchProjects = (sortBy) => {
//   return sortBy ? _fetchProjects({sortBy}) : _fetchProjects({sortBy: null});
// };

export const updateProject = (project) => {
  return _updateProject({project});
};
