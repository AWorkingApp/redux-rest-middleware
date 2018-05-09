
import RestClient from './request';
import * as BasicActions from './actions';

const _resourceClients = {};
const _resourceActions = {};
const _initialReducers = {};

export const configResources = (resources) => {
    resources.forEach((resource) => {
        if (!resource.url || !resource.resource) {
            throw new Error('Resource must have both url and resource specified');
        }

        // TODO check if resource already exist
        addResource(resource);
    });
}

function addResource({ resource, url }) {
    _resourceClients[resource] = RestClient(resource, url);

    const _resourceName = resource[0].toUpperCase() + resource.substr(1);

    _resourceActions[`get${_resourceName}`] = ({ id, options, route } = {}) => {
        if(id){
            return BasicActions.getResource(resource, id, options, route);
        }
        return BasicActions.getResources(resource, options, route);
    }; 
    _resourceActions[`getAll${_resourceName}`] = ({ options, route }) => BasicActions.getResources(resource, options, route); 

    _resourceActions[`post${_resourceName}`] = ({ entity, options, route }) => BasicActions.postResource(resource, entity, options, route); 
    _resourceActions[`put${_resourceName}`] = ({ id, entity, options, route }) => BasicActions.putResource(resource, id, entity, options, route); 
    _resourceActions[`delete${_resourceName}`] = ({ id, options, route }) => BasicActions.deleteResource(resource, id, options, route); 

    _initialReducers[resource.toLowerCase()] = { 
        data: [],
        detail: {},
        loading: false,
    };
}

export default _resourceActions;
export function getInitialReducerState(){
    return _initialReducers;
}

export function getResourceClient(resource) {
    return _resourceClients[resource];
}
