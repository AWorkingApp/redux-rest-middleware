/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import axios from 'axios';

import * as Interceptors from './interceptors';

import { METHODS } from './constants';

const _processResource = (interceptor, resource, method) => {
  // resources filter is defined
  if (interceptor.resources && Array.isArray(interceptor.resources)) {
    // check resource filter, if there is a resource match
    for (let interRes of interceptor.resources) {
      // find the matching resource
      if (interRes.resource === resource) {
        if (!interRes.methods
                    || (Array.isArray(interRes.methods) && interRes.methods.indexOf(method)) > -1) {
          // this is the match resource and method, check if we want to exclude or include this resource
          if (interceptor.exclude) {
            return false;
          }

          return true;
        }
      }
    }

    // we dont find this resource, if not exclude, we dont process this resource/method
    if (!interceptor.exclude) {
      return false;
    }
  }

  return true; // process this resources if the filter is not defined
};

async function handleInterceptors (interceptors = [], data = {}, resource, method) { // eslint-disable-line
  let _data = { ...data };
  for (let inter of interceptors) {
    let __data;
    if (typeof inter === 'function') {
      __data = await inter(_data, resource);
    } else if (inter && inter !== null && typeof inter === 'object') {
      if (typeof inter.interceptor === 'function') {
        if (_processResource(inter, resource, method)) {
          __data = await inter.interceptor(_data, resource);
        }
      }
    }
    if (__data) {
      _data = __data;
    }
  }

  return _data;
}

export async function request(options, resource) {
  const preInterceptors = Interceptors.getPreInterceptors();
  const postInterceptors = Interceptors.getPostInterceptors();
  const method = options.method;
  let _options = await handleInterceptors(preInterceptors, options, resource, method);
  return axios(_options).then(async response => {
    let _response = await handleInterceptors(postInterceptors, response, resource, method);
    return { data: _response.data, status: _response.status };
  }).catch(e => {
    throw e;
  });
}

export async function _get(url, options = {}, resource) {
  return await request({
    method: METHODS.GET,
    url: url,
    ...options
  }, resource);
}

export async function _post(url, options = {}, resource) {
  return await request({
    method: METHODS.POST,
    url: url,
    ...options
  }, resource);
}

export async function _put(url, options = {}, resource) {
  return await request({
    method: METHODS.PUT,
    url: url,
    ...options
  }, resource);
}

export async function _delete(url, options = {}, resource) {
  return await request({
    method: METHODS.DELETE,
    url: url,
    ...options
  }, resource);
}

export default function RestClient(resource, resourceUrl) {
  return {
    getAll: async (options = {}, route = '') => {
      let url = `${resourceUrl}${route}`;
      return await _get(url, options, resource);
    },

    get: async (id, options = {}, route = '') => {
      let url = `${resourceUrl}${route}/${id}`;
      return await _get(url, options, resource);
    },

    post: async (options = {}, route = '') => {
      let url = `${resourceUrl}${route}`;
      return await _post(url, options, resource);
    },

    put: async (options = {}, route = '') => {
      let url = `${resourceUrl}${route}}`;
      return await _put(url, options, resource);
    },

    delete: async (id, options = {}, route = '') => {
      let url = `${resourceUrl}${route}/${id}`;
      return await _delete(url, options, resource);
    }
  };
}

