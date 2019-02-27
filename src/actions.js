import * as Consts from './constants';

/**
 * Used when logging out to clear all loaded resources
 */
export function clearAll() {
    return {
        type: Consts.CLEAR_ALL
    }
}

/**
 * Get
 */
export function getResource(resource, id, options = {}, route = ''){
    return crudAction(Consts.GET_RESOURCE, resource, id, options, route);
}

export function getResourceSuccess(resource, id, payload) {
    return crudSuccessAction(Consts.METHODS.GET, resource, id, payload);
}

/**
 * Get All
 */
export function getResources(resource, options = {}, route = ''){
    return crudAction(Consts.GET_RESOURCES, resource, undefined, options, route);
}

export function getResourcesSuccess(resource, payload) {
    return crudSuccessAction(Consts.METHODS.GET, resource, undefined, payload);
}

/**
 * Post
 */
export function postResource(resource, entity = {}, options = {}, route = '') {
    options.data = entity;
    return crudAction(Consts.POST_RESOURCE, resource, undefined, options, route);
}

export function postResourceSuccess(resource, payload) {
    return crudSuccessAction(Consts.METHODS.POST, resource, undefined, payload);
}

/**
 * Put
 */
export function putResource(resource, id, entity = {}, options = {}, route = '') {
    options.data = entity;
    return crudAction(Consts.PUT_RESOURCE, resource, id, options, route);
}

export function putResourceSuccess(resource, id, payload) {
    return crudSuccessAction(Consts.METHODS.PUT, resource, id, payload);
}

/**
 * Delete
 */

export function deleteResource(resource, id, options = {}, route = '') {
    return crudAction(Consts.DELETE_RESOURCE, resource, id, options, route);
}

export function deleteResourceSuccess(resource, id, payload) {
    return crudSuccessAction(Consts.METHODS.DELETE, resource, id, payload);
}

/**
 * Clear the detail of the resource
 */
export function clearResourceDetail(resource){
    return { 
        type: Consts.CLEAR_RESOURCE_DETAIL,
        resource
    }
}

export function clearResourceData(resource){
    return { 
        type: Consts.CLEAR_RESOURCE_DATA,
        resource
    }
}

/**
 * Request error
 */
export function requestError(resource, id, error) {
    return crudErrorAction(resource, id, error);
}

/**
 * Runtime error
 */
export function runtimeError(resource, id, error) {
    return runtimeErrorAction(resource, id, error);
}

/**
 * Internals
 */
function crudAction(type, resource, id, options, route) {
    if (!id) {
        return {
            type,
            resource,
            options,
            route,
        }
    }
    return {
        type,
        resource,
        id,
        options,
        route,
    }
}

function crudSuccessAction(method, resource, id, payload) {
    if (!id) {
        return {
            type: Consts.REQUEST_SUCCESS,
            method,
            resource,
            payload,
        }
    }
    return {
        type: Consts.REQUEST_SUCCESS,
        method,
        resource,
        id,
        payload,
    }
}

function crudErrorAction(resource, id, error) {
    if (!id) {
        return {
            type: Consts.REQUEST_ERROR,
            resource,
            error,
        }
    }
    return {
        type: Consts.REQUEST_ERROR,
        resource,
        id,
        error,
    }
}

function runtimeErrorAction(resource, id, error) {
    if (!id) {
        return {
            type: Consts.RUNTIME_ERROR,
            resource,
            error,
        }
    }
    return {
        type: Consts.RUNTIME_ERROR,
        resource,
        id,
        error,
    }
}

// This is for custom http request
export function requestReources(request, resource, options = {}, route = '') {
    return {
    }
}
