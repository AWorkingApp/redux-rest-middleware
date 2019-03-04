/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

const isObject = val => typeof val === 'function' || toString.call(val) === '[object Object]';

const isPrimitive = val => typeof val === 'object' ? val === null : typeof val !== 'function';

export const isArray = val => Array.isArray(val);

export const deepClone = target => {
  if (isPrimitive(target)) {
    return target;
  }

  if (isArray(target)) {
    let r = [];
    target.forEach(t => {
      r.push(deepClone(t));
    });
    return r;
  }

  if (isObject(target)) {
    let r = {};
    for (const key of Object.keys(target)) {
      r[key] = deepClone(target[key]);
    }

    return r;
  }

  // by default we return target;
  return Object.assign({}, target);
};

export function updateInObjectKeyValue(oldObject, keyArray, value) {
  let updatedObject = {};
  let tmpState = updatedObject;
  // construct the new obejct based on key value provided
  keyArray.forEach((_key, index) => {
    if (index !== keyArray.length - 1) {
      // check if this is a exsiting key in oldObject at the root level
      if (index === 0 && typeof oldObject[_key] !== 'undefined') {
        tmpState[_key] = deepClone(oldObject[_key]);
      } else {
        // if does not exist, we create a empty object as placeholder
        tmpState[_key] = {};
      }
      tmpState = tmpState[_key];
    } else {
      // last key
      tmpState[_key] = deepClone(value);
    }
  });

  let clonedOldObject = deepClone(oldObject);
  return Object.assign({}, clonedOldObject, updatedObject);
}

export function updateObjectKeyValue(oldObject, key, value) {
  return updateInObjectKeyValue(oldObject, [key], value);
}
