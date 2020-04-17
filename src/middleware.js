/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import * as ResourcesActions from './actions';

import { getResourceClient, configResources } from './resources';
import { configPreInterceptors, configPostInterceptors } from './interceptors';

import * as Consts from './constants';

const _onError = (next, action) => error => {
  let { response, message } = error;

  try {
    if (action
      && action.options
      && action.options.onSuccess
      && typeof action.options.onSuccess === 'function') {
      action.options.onError(error);
    }
  } catch (e) { }

  if (response && message) {
    return next(
      ResourcesActions
        .requestError(action.resource, action.id, { status: response.status, message, response })
    );
  }

  // general error handling
  return next(ResourcesActions.runtimeError(action.resource, action.id, error));
};

// TODO Error handling?
const onSuccessCallback = (action, data) => {
  try {
    if (action
      && action.options
      && action.options.onSuccess
      && typeof action.options.onSuccess === 'function') {
      action.options.onSuccess(data);
    }
  } catch (e) { }
};

const resourceMiddleware = store => next => action => { // eslint-disable-line
  const restClient = getResourceClient(action.resource);
  const onError = _onError(next, action);
  // apply all middlewares
  next(action);
  switch (action.type) {
    case Consts.GET_RESOURCE:
      restClient
        .get(action.id, action.options, action.route)
        .then(result => {
          onSuccessCallback(action, result.data);
          return next(ResourcesActions
            .getResourceSuccess(action.resource, action.id, result.data, action.options));
        }, onError);
      break;

    case Consts.GET_RESOURCES:
      restClient
        .getAll(action.options, action.route)
        .then(result => {
          onSuccessCallback(action, result.data);
          return next(ResourcesActions
            .getResourcesSuccess(action.resource, result.data, action.options));
        }, onError);
      break;

    case Consts.POST_RESOURCE:
      restClient
        .post(action.options, action.route)
        .then(result => {
          onSuccessCallback(action, result.data);
          return next(ResourcesActions
            .postResourceSuccess(action.resource, result.data, action.options));
        }, onError);
      break;

    case Consts.PUT_RESOURCE:
      restClient
        .put(action.options, action.route)
        .then(result => {
          onSuccessCallback(action, result.data);
          return next(ResourcesActions
            .putResourceSuccess(action.resource, action.id, result.data, action.options));
        }, onError);
      break;

    case Consts.DELETE_RESOURCE:
      restClient
        .delete(action.id, action.options, action.route)
        .then(result => {
          onSuccessCallback(action, result.data);
          return next(ResourcesActions
            .deleteResourceSuccess(action.resource, action.id, result.data, action.options));
        }, onError);
      break;
    default:
      break;
  }
};

export default function createResourceMiddleware(resources = [],
  preInterceptors = [],
  postInterceptors = []) {

  if (!Array.isArray(resources)) {
    throw new Error('Resources should be an array of resources');
  }

  if (resources.length === 0) {
    throw new Error('At least one resource is required');
  }

  configResources(resources);

  if (!Array.isArray(preInterceptors)) {
    throw new Error('preInterceptors should be an array of functions');
  }

  configPreInterceptors(preInterceptors);

  if (!Array.isArray(postInterceptors)) {
    throw new Error('postInterceptors should be an array of functions');
  }

  configPostInterceptors(postInterceptors);

  return resourceMiddleware;
}
