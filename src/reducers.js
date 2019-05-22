/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import { getInitialReducerState } from './resources';
import * as Utils from './utils';
import * as Consts from './constants';

function requestSuccessReducer(state, action) {
  let dataIdx;

  let resultState = Utils.updateObjectKeyValue(state, 'loading', false);
  resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'loading'], false);

  if (action.payload.id) {
    dataIdx = resultState[action.resource].data.findIndex(d => `${d.id}` === `${action.payload.id}`);
  } else if (action.id) {
    dataIdx = resultState[action.resource].data.findIndex(d => `${d.id}` === `${action.id}`);
  }

  switch (action.method) {
    case Consts.METHODS.GET:
      if (action.id) {
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], action.payload);
      }
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], action.payload);

    case Consts.METHODS.POST:
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], resultState[action.resource].data.concat(action.payload));

    case Consts.METHODS.PUT:
      // if current detail is loaded, update detail as well
      if (resultState[action.resource].detail.id === action.payload.id
        || typeof resultState[action.resource].detail.id === 'undefined') {

        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], action.payload);
      }

      if (dataIdx > -1) {
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'data', dataIdx], action.payload);
      } else {
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], resultState[action.resource].data.concat(action.payload));
      }

    case Consts.METHODS.DELETE:
      if (dataIdx > -1) {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], {});
        // remove from current resultState data
        resultState[action.resource].data.splice(dataIdx, 1);
        return resultState;

      }
      break;

    default:
      break;
  }

  return resultState;
}

export default function resources(
  state = Utils.deepClone({ loading: false, ...getInitialReducerState() }),
  action = {}) {

  switch (action.type) {
    case Consts.POST_RESOURCE:
    case Consts.GET_RESOURCES: {
      return Utils.updateInObjectKeyValue(
        Utils.updateObjectKeyValue(state, 'loading', true),
        [action.resource, 'loading'],
        true);
    }

    case Consts.PUT_RESOURCE: {
      return Utils.updateInObjectKeyValue(
        Utils.updateObjectKeyValue(state, 'loading', true),
        [action.resource, 'loading'],
        true);
    }

    case Consts.GET_RESOURCE:
    case Consts.DELETE_RESOURCE: {
      return Utils.updateInObjectKeyValue(
        Utils.updateInObjectKeyValue(
          Utils.updateObjectKeyValue(state, 'loading', true), [action.resource, 'loading'], true),
        [action.resource, 'detail'], {}
      );
    }

    case Consts.REQUEST_SUCCESS:
      return requestSuccessReducer(state, action);

    case Consts.REQUEST_ERROR:
    case Consts.RUNTIME_ERROR: {
      return Utils.updateInObjectKeyValue(
        Utils.updateObjectKeyValue(state, 'loading', false), [action.resource, 'loading'],
        false);
    }

    case Consts.CLEAR_RESOURCE_DATA:
      return Utils.updateInObjectKeyValue(state, [action.resource, 'data'], []);

    case Consts.CLEAR_RESOURCE_DETAIL:
      return Utils.updateInObjectKeyValue(state, [action.resource, 'detail'], {});

      // return to initial state
    case Consts.CLEAR_ALL:
      return Utils.deepClone({ loading: false, ...getInitialReducerState() });

    default:
      break;
  }
  return state;
}
