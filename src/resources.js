/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import restClient from './request';
import * as BasicActions from './actions';

const _resourceClients = {};
const _resourceActions = {
  clearAll: BasicActions.clearAll
};
const _resourceActionsMap = {};
const _initialReducers = {};

function addResource({ resource, url, dataField = {}, idField = {} }) {
  _resourceClients[resource] = restClient(resource, url);

  const _resourceName = resource[0].toUpperCase() + resource.substr(1);
  const newResourceMap = {};

  _resourceActions[`get${_resourceName}`] = ({ id, options, route } = {}) => {
    if (id) {
      return BasicActions.getResource(resource, id, options, route);
    }
    return BasicActions.getResources(resource, options, route);
  };
  _resourceActions[`getAll${_resourceName}`] = ({ options, route }) => BasicActions.getResources(resource, options, route);

  _resourceActions[`post${_resourceName}`] = ({ entity, options, route }) => BasicActions.postResource(resource, entity, options, route);
  _resourceActions[`put${_resourceName}`] = ({ id = '', entity, options, route }) => BasicActions.putResource(resource, id, entity, options, route);
  _resourceActions[`delete${_resourceName}`] = ({ id, options, route }) => BasicActions.deleteResource(resource, id, options, route);

  _resourceActions[`clear${_resourceName}Detail`] = () => BasicActions.clearResourceDetail(resource);
  _resourceActions[`clear${_resourceName}Data`] = () => BasicActions.clearResourceData(resource);

  // create a new map element reference
  newResourceMap[`get${_resourceName}`] = _resourceActions[`get${_resourceName}`];
  newResourceMap[`getAll${_resourceName}`] = _resourceActions[`getAll${_resourceName}`];
  newResourceMap[`post${_resourceName}`] = _resourceActions[`post${_resourceName}`];
  newResourceMap[`put${_resourceName}`] = _resourceActions[`put${_resourceName}`];
  newResourceMap[`delete${_resourceName}`] = _resourceActions[`delete${_resourceName}`];
  newResourceMap[`clear${_resourceName}Detail`] = _resourceActions[`clear${_resourceName}Detail`];
  newResourceMap[`clear${_resourceName}Data`] = _resourceActions[`clear${_resourceName}Data`];

  _resourceActionsMap[resource] = newResourceMap;

  const _dataField = {
    getAll: null,
    get: null,
    post: null,
    put: null,
    delete: null,
    ...dataField,
    ...idField
  };

  _initialReducers[resource] = Object.assign({}, {
    data: [],
    rawData: [],
    dataField: _dataField,
    detail: {},
    rawDetail: {},
    loading: false,
    total: 0
  });
}

export const configResources = resources => {
  resources.forEach(resource => {
    if (!resource.url || !resource.resource) {
      throw new Error('Resource must have both url and resource specified');
    }

    // TODO check if resource already exist
    addResource(resource);
  });
};

export default _resourceActions;
export function getInitialReducerState() {
  return _initialReducers;
}

export function getResourceClient(resource) {
  return _resourceClients[resource];
}

export function getResourceActions(resource, dispatch) {
  const funcs = _resourceActionsMap[resource];
  const _resourceName = resource[0].toUpperCase() + resource.substr(1);

  const resultActions = {};
  resultActions[`get${_resourceName}`] = config => dispatch(funcs[`get${_resourceName}`](config));
  resultActions[`getAll${_resourceName}`] = config => dispatch(funcs[`getAll${_resourceName}`](config));
  resultActions[`post${_resourceName}`] = config => dispatch(funcs[`post${_resourceName}`](config));
  resultActions[`put${_resourceName}`] = config => dispatch(funcs[`put${_resourceName}`](config));
  resultActions[`delete${_resourceName}`] = config => dispatch(funcs[`delete${_resourceName}`](config));
  resultActions[`clear${_resourceName}Detail`] = () => dispatch(funcs[`clear${_resourceName}Detail`]());
  resultActions[`clear${_resourceName}Data`] = () => dispatch(funcs[`clear${_resourceName}Data`]());
  resultActions.clearAll = () => dispatch(BasicActions.clearAll());

  return resultActions;
}
