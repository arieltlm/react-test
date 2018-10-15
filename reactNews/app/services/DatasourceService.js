// IMPORT PROJECT REFERENCES


import {fetchJSON} from '../utils/Fetch';

// SERVICES

const _fetchDatasource = fetchJSON('/datasource/show');
export const deleteDatasource = fetchJSON('/datasource/delete');
export const createDatasource = fetchJSON('/datasource/create');
export const fetchPreviewData = fetchJSON('/etl/previewData');
export const fetchImportData = fetchJSON('/etl/importData');
export const fetchDatasources = fetchJSON('/datasource/list');

export const fetchDatasource = (id) => {
  return id ? _fetchDatasource({id}) : _fetchDatasource({id: null});
};
