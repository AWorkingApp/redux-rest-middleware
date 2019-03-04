/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import ResourcesActions, { getResourceActions } from './resources';
import ResourcesReducer from './reducers';

// create the middleware
import createResourceMiddleware from './middleware';

import { METHODS, REQUEST_SUCCESS, REQUEST_ERROR, RUNTIME_ERROR } from './constants';

import RestClient from './request';

export default {
  ResourcesActions,
  getResourceActions,

  ResourcesReducer,

  createResourceMiddleware,
  RestClient,

  METHODS,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  RUNTIME_ERROR
};
