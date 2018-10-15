// IMPORT SERVICES

import {fetchProject, fetchProjects, updateProject, createProject, deleteProject} from '../../services/ProjectService';

// IMPORT ACTIONS

import { initialCanvasOperators } from './canvas/canvasActions';
import {startSessionWithKernelSpec} from './sessionActions';

// FETCH PROJECT ACTION NAMES
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const FETCH_PROJECT_PENDING = 'FETCH_PROJECT_PENDING';
export const FETCH_PROJECT_FULFILLED = 'FETCH_PROJECT_FULFILLED';
export const FETCH_PROJECT_REJECTED = 'FETCH_PROJECT_REJECTED';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDINGS';
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';
export const FETCH_PROJECTS_REJECTED = 'FETCH_PROJECTS_REJECTED';

export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const UPDATE_PROJECT_PENDING = 'UPDATE_PROJECT_PENDING';
export const UPDATE_PROJECT_FULFILLED = 'UPDATE_PROJECT_FULFILLED';
export const UPDATE_PROJECT_REJECTED = 'UPDATE_PROJECT_REJECTED';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const CREATE_PROJECT_PENDING = 'CREATE_PROJECT_PENDING';
export const CREATE_PROJECT_FULFILLED = 'CREATE_PROJECT_FULFILLED';
export const CREATE_PROJECT_REJECTED = 'CREATE_PROJECT_REJECTED';

export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_PROJECT_PENDING = 'DELETE_PROJECT_PENDING';
export const DELETE_PROJECT_FULFILLED = 'DELETE_PROJECT_FULFILLED';
export const DELETE_PROJECT_REJECTED = 'DELETE_PROJECT_REJECTED';

// ACTION GENERATORS

const prepareProjectAction = (projectId) => {
  return dispatch =>
    dispatch(fetchProjectAction(projectId)).then((projectResult) => {
      const project = projectResult.value;
      dispatch(initialCanvasOperators(project));
      dispatch(startSessionWithKernelSpec(project));
    });
};

const fetchProjectsAction = (req) => ({
  type: FETCH_PROJECTS,
  payload: fetchProjects(req)
});

const fetchProjectAction = (id) => ({
  type: FETCH_PROJECT,
  payload: fetchProject(id)
});

const updateProjectAction = (project) => ({
  type: UPDATE_PROJECT,
  payload: updateProject(project)
});

const createProjectAction = (req, body) => {
  return dispatch => {
    return dispatch({
      type: CREATE_PROJECT,
      payload: createProject(req, body)
    }).then((res) => {
      console.log('res: ' + res.value);
      dispatch(fetchProjectsAction({...body}));
    });
  };
};

const deleteProjectAction = (req, body, totalCount, pageSize, pageIndex) => {
  return dispatch => {
    return dispatch({
      type: DELETE_PROJECT,
      payload: deleteProject(req)
    }).then((res) => {
      console.log('res: ' + res.value);
      (totalCount % pageSize === 1)?
        dispatch(fetchProjectsAction({...body, pageIndex: pageIndex-1})):
        dispatch(fetchProjectsAction(body));
    });
  };
};

// EXPORT ACTIONS

export {
  prepareProjectAction as prepareProject,
  fetchProjectAction as fetchProject,
  fetchProjectsAction as fetchProjects,
  updateProjectAction as updateProject,
  createProjectAction as createProject,
  deleteProjectAction as deleteProject,
};
