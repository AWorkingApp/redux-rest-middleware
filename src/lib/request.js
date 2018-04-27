
import axios from 'axios';

import * as Interceptors from './interceptors';

import { METHODS } from './constants';

export async function _get(url, options = {}) {
    return await request({
        method: METHODS.GET,
        url: url,
        ...options
    });
}

export async function _post(url, options = {}) {
    return await request({
        method: METHODS.POST,
        url: url,
        ...options
    });
}

export async function _put(url, options = {}) {
    return await request({
        method: METHODS.PUT,
        url: url,
        ...options
    });
}

export async function _delete(url, options = {}) {
    return await request({
        method: METHODS.DELETE,
        url: url,
        ...options
    });
}

export async function request(options) {
    const preInterceptors = Interceptors.getPreInterceptors();
    const postInterceptors = Interceptors.getPostInterceptors();
    let _options = { ...options };
    for (let inter of preInterceptors) {
        _options = await inter(_options);
    }
    return axios(_options).then(async (response) => {
        let _response = response;
        for (let inter of postInterceptors) {
            _response = await inter(_response);
        }
        return { data: _response.data, status: _response.status };
    }).catch ((e) => {
        throw e;
    });
}

export default function RestClient(resourceUrl) {
    return {
        getAll: async (options = {}, route = '') => {
            let url = `${resourceUrl}${route}`;
            return await _get(url, options);
        },

        get: async (id, options = {}, route = '') => {
            let url = `${resourceUrl}${route}/${id}`;
            return await _get(url, options);
        },

        post: async (options = {}, route = '') => {
            let url = `${resourceUrl}${route}`;
            return await _post(url, options);
        },

        put: async (id, options = {}, route = '') => {
            let url = `${resourceUrl}${route}/${id}`;
            return await _put(url, options);
        },

        delete: async (id, options = {}, route = '') => {
            let url = `${resourceUrl}${route}/${id}`;
            return await _delete(url, options);
        }
    }
}
