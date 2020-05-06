/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

export const GET_RESOURCES = 'REDUX_REST_RESOURCE_GET_RESOURCES';

export const GET_RESOURCE = 'REDUX_REST_RESOURCE_GET_RESOURCE';

export const POST_RESOURCE = 'REDUX_REST_RESOURCE_POST_RESOURCE';

export const PUT_RESOURCE = 'REDUX_REST_RESOURCE_PUT_RESOURCE';

export const DELETE_RESOURCE = 'REDUX_REST_RESOURCE_DELETE_RESOURCE';

export const CLEAR_RESOURCE_DETAIL = 'REDUX_REST_RESOURCE_CLEAR_RESOURCE_DETAIL';
export const CLEAR_RESOURCE_DATA = 'REDUX_REST_RESOURCE_CLEAR_RESOURCE_DATA';

export const CUSTOM_ACTION_RESOURCE = 'REDUX_REST_RESOURCE_CUSTOM_ACTION_RESOURCE';
export const CUSTOM_ACTION_RESOURCES = 'REDUX_REST_RESOURCE_CUSTOM_ACTION_RESOURCES';

export const REQUEST_SUCCESS = '@@/REDUX_REST_RESOURCE/REQUEST_SUCCESS';
export const REQUEST_ERROR = '@@/REDUX_REST_RESOURCE/REQUEST_ERROR';

export const RUNTIME_ERROR = '@@/REDUX_REST_RESOURCE/RUNTIME_ERROR';

export const CLEAR_ALL = '@@/REDUX_REST_RESOURCE/CLEAR_ALL';

export const METHODS = {
  GETAll: 'getAll',
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

export const REQUEST_MODE = {
  REPLACE: 'replace',
  APPEND: 'append',
  UPDATE: 'update'
};
