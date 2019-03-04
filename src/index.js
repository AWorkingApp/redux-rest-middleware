/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import ResourcesActions, { getResourceActions } from './resources';
import ResourcesReducer from './reducers';

// create the middleware
import createResourceMiddleware from './middleware';

import { METHODS, REQUEST_SUCCESS, REQUEST_ERROR, RUNTIME_ERROR } from './constants';

export default {
  ResourcesActions,
  getResourceActions,

  ResourcesReducer,

  createResourceMiddleware,

  METHODS,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  RUNTIME_ERROR
};
