/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import { getInitialReducerState } from './resources';
import * as Utils from './utils';
import * as Consts from './constants';

function _getPayloadData(fieldKey, action) {
  if (fieldKey === null) {
    return action.payload;
  } else {
    return action.payload[fieldKey];
  }
}

function _requestSuccessReducer(state, action) {
  let dataIdx;
  let payloadData;
  let fieldKey = null;

  let resultState = Utils.updateObjectKeyValue(state, 'loading', false);
  resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'loading'], false);

  if (action.method === Consts.METHODS.PUT || action.method === Consts.METHODS.DELETE) {
    if (typeof resultState[action.resource] !== 'undefined'
      && typeof resultState[action.resource].data !== 'undefined'
      && typeof resultState[action.resource].data.findIndex === 'function') {

      if (action.payload.id) {

        if (action.method === Consts.METHODS.PUT) {
          fieldKey = resultState[action.resource].dataField.put;
        } else if (action.method === Consts.METHODS.DELETE) {
          fieldKey = resultState[action.resource].dataField.delete;
        }
        payloadData = _getPayloadData(fieldKey, action);
        dataIdx = resultState[action.resource].data.findIndex(d => `${d.id}` === `${payloadData.id}`);
      } else if (action.id) {
        dataIdx = resultState[action.resource].data.findIndex(d => `${d.id}` === `${action.id}`);
      }
    }
  }

  switch (action.method) {
    case Consts.METHODS.GET:
      if (action.id) {
        fieldKey = resultState[action.resource].dataField.get;
        payloadData = _getPayloadData(fieldKey, action);

        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], payloadData);
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], action.payload);
      }

      fieldKey = resultState[action.resource].dataField.getAll;
      payloadData = _getPayloadData(fieldKey, action);

      resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], payloadData);
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], action.payload);

    case Consts.METHODS.POST:

      fieldKey = resultState[action.resource].dataField.post;
      payloadData = _getPayloadData(fieldKey, action);

      resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], payloadData);
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], action.payload);

    case Consts.METHODS.PUT:
      // if current detail is loaded, update detail as well
      if (resultState[action.resource].detail.id === action.payload.id
        || typeof resultState[action.resource].detail.id === 'undefined') {

        fieldKey = resultState[action.resource].dataField.put;
        payloadData = _getPayloadData(fieldKey, action);

        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], payloadData);
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], action.payload);
      }

      if (dataIdx > -1) {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data', dataIdx], payloadData);
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData', dataIdx], payloadData);

      } else {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], [payloadData].concat(resultState[action.resource].data));
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], [payloadData].concat(resultState[action.resource].data));
      }

    case Consts.METHODS.DELETE:
      if (dataIdx > -1) {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], {});
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], {});
        // remove from current resultState data
        resultState[action.resource].data.splice(dataIdx, 1);
        resultState[action.resource].rawData.splice(dataIdx, 1);
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

  let resultState;
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
      resultState = Utils.updateInObjectKeyValue(
        Utils.updateInObjectKeyValue(
          Utils.updateObjectKeyValue(state, 'loading', true), [action.resource, 'loading'], true),
        [action.resource, 'detail'], {}
      );

      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], {});
    }

    case Consts.REQUEST_SUCCESS:
      return _requestSuccessReducer(state, action);

    case Consts.REQUEST_ERROR:
    case Consts.RUNTIME_ERROR: {
      return Utils.updateInObjectKeyValue(
        Utils.updateObjectKeyValue(state, 'loading', false), [action.resource, 'loading'],
        false);
    }

    case Consts.CLEAR_RESOURCE_DATA:
      resultState = Utils.updateInObjectKeyValue(state, [action.resource, 'data'], []);
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], []);

    case Consts.CLEAR_RESOURCE_DETAIL:
      resultState = Utils.updateInObjectKeyValue(state, [action.resource, 'detail'], {});
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], {});

      // return to initial state
    case Consts.CLEAR_ALL:
      return Utils.deepClone({ loading: false, ...getInitialReducerState() });

    default:
      break;
  }
  return state;
}
