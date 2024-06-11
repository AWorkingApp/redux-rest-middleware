/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

import { getInitialReducerState } from './resources';
import * as Utils from './utils';
import * as Consts from './constants';

/*
* Retrieve payload data from action, fall backs to the request option data
*/
function _getPayloadData(fieldKey, action) {
  if (fieldKey === null || typeof action.payload[fieldKey] === 'undefined') {
    return action.payload;
  } else {
    return action.payload[fieldKey];
  }
}

function _requestSuccessReducer(state, action) {
  let dataIdx;
  let payloadData;
  let fieldKey = null;
  let idFieldKey = null;
  let options = action.options;

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

  if (Consts.REQUEST_MODE.REQUEST_ONLY === options.requestMode) {
    return resultState;
  }

  switch (action.method) {
    case Consts.METHODS.GET:
      if (action.id) {
        fieldKey = typeof resultState[action.resource].dataField === 'undefined' ? null : resultState[action.resource].dataField.get;
        payloadData = _getPayloadData(fieldKey, action);

        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], payloadData);
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], action.payload);
      }

      fieldKey = typeof resultState[action.resource].dataField === 'undefined' ? null : resultState[action.resource].dataField.getAll;
      idFieldKey = typeof resultState[action.resource].idField === 'undefined' ? null : resultState[action.resource].idField.getAll;
      payloadData = _getPayloadData(fieldKey, action);
      if (Consts.REQUEST_MODE.APPEND === options.requestMode) {
        payloadData = [...resultState[action.resource].data, ...payloadData];
      } else if (Consts.REQUEST_MODE.UPDATE === options.requestMode) {
        // create two maps one for result data, one for payloadData
        let resultDataMap = {};
        [...resultState[action.resource].data].forEach(data => {
          if (idFieldKey !== null && typeof data[idFieldKey] !== 'undefined') {
            resultDataMap[data[idFieldKey]] = data;
          } else {
            resultDataMap[data.id] = data;
          }
        });

        let payloadDataMap = {};
        let mergedResultList = [];
        [...payloadData].forEach(data => {
          if (idFieldKey !== null && typeof data[idFieldKey] !== 'undefined') {
            payloadDataMap[data[idFieldKey]] = data;
          } else {
            payloadDataMap[data.id] = data;
          }
        });

        [...resultState[action.resource].data].forEach(data => {
          let resultDataKey = null;
          if (idFieldKey !== null && typeof data[idFieldKey] !== 'undefined') {
            resultDataKey = data[idFieldKey];
          } else {
            resultDataKey = data.id;
          }

          // we need to update the payload data
          if (typeof payloadDataMap[resultDataKey] !== 'undefined') {
            mergedResultList.push(payloadDataMap[resultDataKey]);
          } else {
            mergedResultList.push(data);
          }
        });

        [...payloadData].forEach(data => {
          let payloadDataKey = null;
          if (idFieldKey !== null && typeof data[idFieldKey] !== 'undefined') {
            payloadDataKey = data[idFieldKey];
          } else {
            payloadDataKey = data.id;
          }

          if (typeof resultDataMap[payloadDataKey] === 'undefined') {
            mergedResultList.push(data);
          }
        });

        payloadData = [...mergedResultList];
      }

      resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], payloadData);
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], action.payload);

    case Consts.METHODS.POST:
      fieldKey = resultState[action.resource].dataField.post;
      payloadData = _getPayloadData(fieldKey, action);

      resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], [payloadData].concat(resultState[action.resource].data));

      // TODO: confirm the update with data list fieldkey
      fieldKey = resultState[action.resource].dataField.getAll;
      if (fieldKey === null) {
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], [payloadData].concat(resultState[action.resource].data));
      }
      return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData', fieldKey], [payloadData].concat(resultState[action.resource].data));

    case Consts.METHODS.PUT:
      // if current detail is loaded, update detail as well
      if (resultState[action.resource].detail.id === action.payload.id
        || typeof resultState[action.resource].detail.id === 'undefined') {

        fieldKey = resultState[action.resource].dataField.put;
        payloadData = _getPayloadData(fieldKey, action);

        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], payloadData);
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], action.payload);
      }

      // use get field key to modify list data
      fieldKey = resultState[action.resource].dataField.getAll;
      if (dataIdx > -1) {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data', dataIdx], payloadData);

        if (fieldKey === null) {
          return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData', dataIdx], payloadData);
        }
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData', fieldKey, dataIdx], payloadData);
      } else {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'data'], [payloadData].concat(resultState[action.resource].data));

        if (fieldKey === null) {
          return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData'], [payloadData].concat(resultState[action.resource].data));
        }
        return Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawData', fieldKey], [payloadData].concat(resultState[action.resource].data));
      }

    case Consts.METHODS.DELETE:
      if (dataIdx > -1) {
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'detail'], {});
        resultState = Utils.updateInObjectKeyValue(resultState, [action.resource, 'rawDetail'], {});
        // remove from current resultState data
        resultState[action.resource].data.splice(dataIdx, 1);

        fieldKey = resultState[action.resource].dataField.getAll;
        if (fieldKey === null) {
          resultState[action.resource].rawData.splice(dataIdx, 1);
        } else {
          resultState[action.resource].rawData[fieldKey].splice(dataIdx, 1);
        }

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
