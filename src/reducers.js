import { fromJS } from 'immutable';

import { getInitialReducerState } from './resources';

import * as Consts from './constants';

function requestSuccessReducer(state, action) {
  let dataIdx;
  let resultState = state.set('loading', false)
    .setIn([action.resource, 'loading'], false);

  if (action.payload.id) {
    dataIdx = resultState.getIn([action.resource, 'data']).findIndex(d => `${d.get('id')}` === `${action.payload.id}`);
  } else if (action.id) {
    dataIdx = resultState.getIn([action.resource, 'data']).findIndex(d => d.get('id') === action.id);
  }

  switch (action.method) {
    case Consts.METHODS.GET:
      if (action.id) {
        return resultState.setIn([action.resource, 'detail'], fromJS(action.payload));
      }
      return resultState.setIn([action.resource, 'data'], fromJS(action.payload));

    case Consts.METHODS.POST:
      return resultState.updateIn([action.resource, 'data'], data => data.push(fromJS(action.payload)));

    case Consts.METHODS.PUT:
      // if current detail is loaded, update detail as well
      if (resultState.getIn([action.resource, 'detail', 'id']) === action.payload.id
        || typeof resultState.getIn([action.resource, 'detail', 'id']) === 'undefined') {
        resultState = resultState.setIn([action.resource, 'detail'], fromJS(action.payload));
      }

      if (dataIdx > -1) {
        return resultState
          .setIn([action.resource, 'data', dataIdx], fromJS(action.payload));
      } else {
        return resultState.updateIn([action.resource, 'data'], data => data.unshift(fromJS(action.payload)));
      }

    case Consts.METHODS.DELETE:
      if (dataIdx > -1) {
        return resultState.deleteIn([action.resource, 'data', dataIdx])
          .deleteIn([action.resource, 'detail']);
      }
      break;

    default:
      break;
  }

  return resultState;
}

// TODO get rid of immutablejs as dependency
export default function resources(
  state = fromJS({ loading: false, ...getInitialReducerState() }),
  action = {}) {

  switch (action.type) {
    case Consts.GET_RESOURCES:
      return state.set('loading', true)
        .setIn([action.resource, 'loading'], true);

    case Consts.POST_RESOURCE:
      return state.set('loading', true)
        .setIn([action.resource, 'loading'], true);

    case Consts.PUT_RESOURCE:
    case Consts.GET_RESOURCE:
    case Consts.DELETE_RESOURCE:
      return state.set('loading', true)
        .setIn([action.resource, 'loading'], true)
        .setIn([action.resource, 'detail'], fromJS({}));

    case Consts.REQUEST_SUCCESS:
      return requestSuccessReducer(state, action);

    case Consts.REQUEST_ERROR:
    case Consts.RUNTIME_ERROR:
      return state.set('loading', false).setIn([action.resource, 'loading'], false);

    case Consts.CLEAR_RESOURCE_DATA:
      return state
        .setIn([action.resource, 'data'], fromJS([]));

    case Consts.CLEAR_RESOURCE_DETAIL:
      return state
        .setIn([action.resource, 'detail'], fromJS({}));

      // return to initial state
    case Consts.CLEAR_ALL:
      return fromJS({ loading: false, ...getInitialReducerState() });

    default:
      break;
  }
  return state;
}
