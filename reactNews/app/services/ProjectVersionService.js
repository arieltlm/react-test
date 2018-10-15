// IMPORT PROJECT REFERENCES


import {fetchJSON} from '../utils/Fetch';

// SERVICES

export const createProjectVersion = (project) => {
  // create a new project version to update project
  return fetchJSON('/projectVersion/create')(project);
};
