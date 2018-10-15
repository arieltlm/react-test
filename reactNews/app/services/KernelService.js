// IMPORT PACKAGE REFERENCES
import path from 'path';

// IMPORT PROJECT REFERENCES

import {fetchJSON} from '../utils/Fetch';

// SERVICES
const engineUrl = 'http://vm.ml:8888/api';

const _fetchKernelSpecs = fetchJSON('/kernelspecs', {method: 'GET'}, engineUrl);
const _fetchKernelSpec = (kernelSpecName) => {
  return fetchJSON(path.join('/kernelspecs', kernelSpecName), {method: 'GET'}, engineUrl);
};

const _fetchKernels = fetchJSON('/kernels', {method: 'GET'}, engineUrl);
const _startKernel = fetchJSON(path.join('/kernels'), {}, engineUrl);
const _shutdownKernel = (kernelId) => {
  return fetchJSON(path.join('/kernels', kernelId, 'shutdown'), {method: 'DELETE'}, engineUrl);
};
const _fetchKernel = (kernelId) => {
  return fetchJSON(path.join('/kernels', kernelId), {method: 'GET'}, engineUrl);
};
const _interruptKernel = (kernelId) => {
  return fetchJSON(path.join('/kernels', kernelId, 'interrupt'), {}, engineUrl);
};
const _restartKernel = (kernelId) => {
  return fetchJSON(path.join('/kernels', kernelId, 'restart'), {}, engineUrl);
};

export const fetchKernelSpecs = _fetchKernelSpecs;
export const fetchKernelSpec = _fetchKernelSpec;

export const fetchKernels = _fetchKernels;
export const fetchKernel = _fetchKernel;
export const startKernel = (kernelSpecName) => {
  return _startKernel({name: kernelSpecName});
};
export const shutdownKernel = _shutdownKernel;
export const interruptKernel = _interruptKernel;
export const restartKernel = _restartKernel;
