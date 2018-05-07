
import axios from 'axios';

import * as Interceptors from './interceptors';

import { METHODS } from './constants';

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

export async function request(options, resource) {
    const preInterceptors = Interceptors.getPreInterceptors();
    const postInterceptors = Interceptors.getPostInterceptors();
    let _options = { ...options };
    for (let inter of preInterceptors) {
        let __options = await inter(_options, resource);
        if (__options) {
            _options = __options;
        }
    }
    return axios(_options).then(async (response) => {
        let _response = response;
        for (let inter of postInterceptors) {
            let __response = await inter(_response, resource);
            if (__response) {
                _response = __response;
            }
        }
        return { data: _response.data, status: _response.status };
    }).catch ((e) => {
        throw e;
    });
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

        put: async (id, options = {}, route = '') => {
            let url = `${resourceUrl}${route}/${id}`;
            return await _put(url, options, resource);
        },

        delete: async (id, options = {}, route = '') => {
            let url = `${resourceUrl}${route}/${id}`;
            return await _delete(url, options, resource);
        }
    }
}
