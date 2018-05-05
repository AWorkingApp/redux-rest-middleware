
import * as ResourcesActions from './actions';

import { getResourceClient, addResource } from './resources';
import { addPreInterceptor, addPostInterceptor } from './interceptors';

import * as Consts from './constants';

const resourceMiddleware = store => next => action => {
    const restClient = getResourceClient(action.resource);
    const onError  = _onError(next, action);
    // apply all middlewares
    next(action);
    switch (action.type) {
        case Consts.GET_RESOURCE:
            restClient
                .get(action.id, action.options, action.route)
                .then((result) => {
                    return next(ResourcesActions.getResourceSuccess(action.resource, action.id, result.data));
                }, onError);
            break;

        case Consts.GET_RESOURCES:
            restClient
                .getAll(action.options, action.route)
                .then((result) => {
                    return next(ResourcesActions.getResourcesSuccess(action.resource, result.data));
                }, onError);
            break;

        case Consts.POST_RESOURCE:
            restClient
                .post(action.options, action.route)
                .then((result) => {
                    return next(ResourcesActions.postResourceSuccess(action.resource, result.data));
                }, onError);
            break;

        case Consts.PUT_RESOURCE:
            restClient
                .put(action.id, action.options, action.route)
                .then((result) => {
                    return next(ResourcesActions.putResourceSuccess(action.resource, action.id, result.data));
                }, onError);
            break;
        
        case Consts.DELETE_RESOURCE:
            restClient
                .delete(action.id, action.options, action.route)
                .then((result) => {
                    return next(ResourcesActions.deleteResourceSuccess(action.resource, action.id, result.data));
                }, onError);
            break;
        default:
            break;
    }
};

export default function createResourceMiddleware(resources = [], preInterceptors = [], postInterceptors = []) {
    if (!Array.isArray(resources)) {
        throw new Error('Resources should be an array of resources');
    }

    if (resources.length === 0) {
        throw new Error('At least one resource is required');
    }

    resources.forEach((resource) => {
        if (!resource.url || !resource.resource) {
            throw new Error('Resource must have both url and resource specified');
        }

        // TODO check if resource already exist
        addResource(resource);
    });

    if (!Array.isArray(preInterceptors)) {
        throw new Error('preInterceptors should be an array of functions');
    }

    preInterceptors.forEach((preInterceptor) => {
        if(typeof preInterceptor !== 'function'){
            throw new Error('preInteceptor must be a function');
        }

        addPreInterceptor(preInterceptor);
    });

    if (!Array.isArray(postInterceptors)) {
        throw new Error('postInterceptors should be an array of functions');
    }

    postInterceptors.forEach((postInterceptor) => {
        if(typeof postInterceptor !== 'function'){
            throw new Error('postInteceptor must be a function');
        }

        addPostInterceptor(postInterceptor);
    });

    return resourceMiddleware;
}

const _onError = (next, action) => error => {
    let { response, message } = error;

    if (response && message) {
        return next(ResourcesActions.requestError(action.resource, action.id, { status: response.status, message, response })); 
    }

    // general error handling
    return next(ResourcesActions.runtimeError(action.resource, action.id, error)); 
}
