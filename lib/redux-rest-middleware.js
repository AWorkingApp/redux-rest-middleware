/*!
 * redux-rest-middleware
 * A middleware to help make standard CRUD request with redux.
 * 
 * @version v1.0.2
 * @author Charlie Liu<charlie@aworkingapp.com>
 * @homepage undefined
 * @repository git+https://github.com/AWorkingApp/redux-rest-middleware.git
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */ "./src/index.js").default;

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! exports provided: clearAll, getResource, getResourceSuccess, getResources, getResourcesSuccess, postResource, postResourceSuccess, putResource, putResourceSuccess, deleteResource, deleteResourceSuccess, clearResourceDetail, clearResourceData, requestError, runtimeError, requestReources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAll", function() { return clearAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourceSuccess", function() { return getResourceSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResources", function() { return getResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourcesSuccess", function() { return getResourcesSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postResource", function() { return postResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postResourceSuccess", function() { return postResourceSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putResource", function() { return putResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putResourceSuccess", function() { return putResourceSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteResource", function() { return deleteResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteResourceSuccess", function() { return deleteResourceSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearResourceDetail", function() { return clearResourceDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearResourceData", function() { return clearResourceData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestError", function() { return requestError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runtimeError", function() { return runtimeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestReources", function() { return requestReources; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */
 // Internal Actions

function crudAction(type, resource, id, options, route) {
  // eslint-disable-line
  if (!id) {
    return {
      type: type,
      resource: resource,
      options: options,
      route: route
    };
  }

  return {
    type: type,
    resource: resource,
    id: id,
    options: options,
    route: route
  };
}

function crudSuccessAction(method, resource, id, payload) {
  // eslint-disable-line
  if (!id) {
    return {
      type: _constants__WEBPACK_IMPORTED_MODULE_0__["REQUEST_SUCCESS"],
      method: method,
      resource: resource,
      payload: payload
    };
  }

  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["REQUEST_SUCCESS"],
    method: method,
    resource: resource,
    id: id,
    payload: payload
  };
}

function crudErrorAction(resource, id, error) {
  if (!id) {
    return {
      type: _constants__WEBPACK_IMPORTED_MODULE_0__["REQUEST_ERROR"],
      resource: resource,
      error: error
    };
  }

  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["REQUEST_ERROR"],
    resource: resource,
    id: id,
    error: error
  };
}

function runtimeErrorAction(resource, id, error) {
  if (!id) {
    return {
      type: _constants__WEBPACK_IMPORTED_MODULE_0__["RUNTIME_ERROR"],
      resource: resource,
      error: error
    };
  }

  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["RUNTIME_ERROR"],
    resource: resource,
    id: id,
    error: error
  };
} // Used when logging out to clear all loaded resources


function clearAll() {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["CLEAR_ALL"]
  };
}
function getResource(resource, id) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var route = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  //eslint-disable-line
  return crudAction(_constants__WEBPACK_IMPORTED_MODULE_0__["GET_RESOURCE"], resource, id, options, route);
}
function getResourceSuccess(resource, id, payload) {
  return crudSuccessAction(_constants__WEBPACK_IMPORTED_MODULE_0__["METHODS"].GET, resource, id, payload);
}
function getResources(resource) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  //eslint-disable-line
  return crudAction(_constants__WEBPACK_IMPORTED_MODULE_0__["GET_RESOURCES"], resource, undefined, options, route); //eslint-disable-line
}
function getResourcesSuccess(resource, payload) {
  return crudSuccessAction(_constants__WEBPACK_IMPORTED_MODULE_0__["METHODS"].GET, resource, undefined, payload); //eslint-disable-line
}
function postResource(resource) {
  var entity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var route = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  //eslint-disable-line
  options.data = entity;
  return crudAction(_constants__WEBPACK_IMPORTED_MODULE_0__["POST_RESOURCE"], resource, undefined, options, route); //eslint-disable-line
}
function postResourceSuccess(resource, payload) {
  return crudSuccessAction(_constants__WEBPACK_IMPORTED_MODULE_0__["METHODS"].POST, resource, undefined, payload); //eslint-disable-line
}
function putResource(resource, id) {
  var entity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var route = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  //eslint-disable-line
  options.data = entity;
  return crudAction(_constants__WEBPACK_IMPORTED_MODULE_0__["PUT_RESOURCE"], resource, id, options, route);
}
function putResourceSuccess(resource, id, payload) {
  return crudSuccessAction(_constants__WEBPACK_IMPORTED_MODULE_0__["METHODS"].PUT, resource, id, payload);
}
function deleteResource(resource, id) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var route = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  //eslint-disable-line
  return crudAction(_constants__WEBPACK_IMPORTED_MODULE_0__["DELETE_RESOURCE"], resource, id, options, route);
}
function deleteResourceSuccess(resource, id, payload) {
  return crudSuccessAction(_constants__WEBPACK_IMPORTED_MODULE_0__["METHODS"].DELETE, resource, id, payload);
} // Clear the detail of the resource

function clearResourceDetail(resource) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["CLEAR_RESOURCE_DETAIL"],
    resource: resource
  };
}
function clearResourceData(resource) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["CLEAR_RESOURCE_DATA"],
    resource: resource
  };
} // Request error

function requestError(resource, id, error) {
  return crudErrorAction(resource, id, error);
} // Runtime error

function runtimeError(resource, id, error) {
  return runtimeErrorAction(resource, id, error);
} // This is for custom http request

function requestReources(request, resource) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var route = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  //eslint-disable-line
  return {};
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: GET_RESOURCES, GET_RESOURCE, POST_RESOURCE, PUT_RESOURCE, DELETE_RESOURCE, CLEAR_RESOURCE_DETAIL, CLEAR_RESOURCE_DATA, CUSTOM_ACTION_RESOURCE, CUSTOM_ACTION_RESOURCES, REQUEST_SUCCESS, REQUEST_ERROR, RUNTIME_ERROR, CLEAR_ALL, METHODS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RESOURCES", function() { return GET_RESOURCES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RESOURCE", function() { return GET_RESOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_RESOURCE", function() { return POST_RESOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUT_RESOURCE", function() { return PUT_RESOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_RESOURCE", function() { return DELETE_RESOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_RESOURCE_DETAIL", function() { return CLEAR_RESOURCE_DETAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_RESOURCE_DATA", function() { return CLEAR_RESOURCE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOM_ACTION_RESOURCE", function() { return CUSTOM_ACTION_RESOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOM_ACTION_RESOURCES", function() { return CUSTOM_ACTION_RESOURCES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_SUCCESS", function() { return REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_ERROR", function() { return REQUEST_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RUNTIME_ERROR", function() { return RUNTIME_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_ALL", function() { return CLEAR_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METHODS", function() { return METHODS; });
/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */
var GET_RESOURCES = 'REDUX_REST_RESOURCE_GET_RESOURCES';
var GET_RESOURCE = 'REDUX_REST_RESOURCE_GET_RESOURCE';
var POST_RESOURCE = 'REDUX_REST_RESOURCE_POST_RESOURCE';
var PUT_RESOURCE = 'REDUX_REST_RESOURCE_PUT_RESOURCE';
var DELETE_RESOURCE = 'REDUX_REST_RESOURCE_DELETE_RESOURCE';
var CLEAR_RESOURCE_DETAIL = 'REDUX_REST_RESOURCE_CLEAR_RESOURCE_DETAIL';
var CLEAR_RESOURCE_DATA = 'REDUX_REST_RESOURCE_CLEAR_RESOURCE_DATA';
var CUSTOM_ACTION_RESOURCE = 'REDUX_REST_RESOURCE_CUSTOM_ACTION_RESOURCE';
var CUSTOM_ACTION_RESOURCES = 'REDUX_REST_RESOURCE_CUSTOM_ACTION_RESOURCES';
var REQUEST_SUCCESS = '@@/REDUX_REST_RESOURCE/REQUEST_SUCCESS';
var REQUEST_ERROR = '@@/REDUX_REST_RESOURCE/REQUEST_ERROR';
var RUNTIME_ERROR = '@@/REDUX_REST_RESOURCE/RUNTIME_ERROR';
var CLEAR_ALL = '@@/REDUX_REST_RESOURCE/CLEAR_ALL';
var METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources */ "./src/resources.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./src/reducers.js");
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ "./src/middleware.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */

 // create the middleware



/* harmony default export */ __webpack_exports__["default"] = ({
  ResourcesActions: _resources__WEBPACK_IMPORTED_MODULE_0__["default"],
  getResourceActions: _resources__WEBPACK_IMPORTED_MODULE_0__["getResourceActions"],
  ResourcesReducer: _reducers__WEBPACK_IMPORTED_MODULE_1__["default"],
  createResourceMiddleware: _middleware__WEBPACK_IMPORTED_MODULE_2__["default"],
  METHODS: _constants__WEBPACK_IMPORTED_MODULE_3__["METHODS"],
  REQUEST_SUCCESS: _constants__WEBPACK_IMPORTED_MODULE_3__["REQUEST_SUCCESS"],
  REQUEST_ERROR: _constants__WEBPACK_IMPORTED_MODULE_3__["REQUEST_ERROR"],
  RUNTIME_ERROR: _constants__WEBPACK_IMPORTED_MODULE_3__["RUNTIME_ERROR"]
});

/***/ }),

/***/ "./src/interceptors.js":
/*!*****************************!*\
  !*** ./src/interceptors.js ***!
  \*****************************/
/*! exports provided: configPreInterceptors, configPostInterceptors, getPreInterceptors, getPostInterceptors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configPreInterceptors", function() { return configPreInterceptors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configPostInterceptors", function() { return configPostInterceptors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreInterceptors", function() { return getPreInterceptors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPostInterceptors", function() { return getPostInterceptors; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
*
* Copyright (c) 2019 - present, A Working App Inc.
*
* interceptor can be either a function or a object,
* if its a function its in the format of
*   (options = {}, resource) => {}, // this return either a new options or false to ignore this interceptor
*
* if interceptor is an object, it is as the following
* {
*    interceptor: (options = {}, resource) => {},
*    exclude: false, // include or excludes all the filtered resource,
*    resources: [{
*        resource: '',
*        methods: [], // if not default, by defaul it checks all methods
*    }]
* }
*/
var _preInterceptors = [];
var _postInterceptors = [];

function addPostInterceptor() {
  var postInter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resource = arguments.length > 1 ? arguments[1] : undefined;
  };

  // eslint-disable-line
  _postInterceptors.push(postInter);
}

var _validInterceptor = function _validInterceptor(interceptor) {
  if (typeof interceptor !== 'function' && (interceptor === null || _typeof(interceptor) !== 'object')) {
    return false;
  }

  return true;
};

function addPreInterceptor() {
  var preInter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resource = arguments.length > 1 ? arguments[1] : undefined;
  };

  // eslint-disable-line 
  _preInterceptors.push(preInter);
}

var configPreInterceptors = function configPreInterceptors() {
  var preInterceptors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  preInterceptors.forEach(function (preInterceptor) {
    if (!_validInterceptor(preInterceptor)) {
      throw new Error('preInteceptor must be a function or a object');
    }

    addPreInterceptor(preInterceptor);
  });
};
var configPostInterceptors = function configPostInterceptors() {
  var postInterceptors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  postInterceptors.forEach(function (postInterceptor) {
    if (!_validInterceptor(postInterceptor)) {
      throw new Error('postInteceptor must be a function');
    }

    addPostInterceptor(postInterceptor);
  });
};
function getPreInterceptors() {
  return _preInterceptors;
}
function getPostInterceptors() {
  return _postInterceptors;
}

/***/ }),

/***/ "./src/middleware.js":
/*!***************************!*\
  !*** ./src/middleware.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createResourceMiddleware; });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./src/actions.js");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources */ "./src/resources.js");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */





var _onError = function _onError(next, action) {
  return function (error) {
    var response = error.response,
        message = error.message;

    try {
      if (action && action.options && action.options.onSuccess && typeof action.options.onSuccess === 'function') {
        action.options.onError(error);
      }
    } catch (e) {}

    if (response && message) {
      return next(_actions__WEBPACK_IMPORTED_MODULE_0__["requestError"](action.resource, action.id, {
        status: response.status,
        message: message,
        response: response
      }));
    } // general error handling


    return next(_actions__WEBPACK_IMPORTED_MODULE_0__["runtimeError"](action.resource, action.id, error));
  };
}; // TODO Error handling?


var onSuccessCallback = function onSuccessCallback(action, data) {
  try {
    if (action && action.options && action.options.onSuccess && typeof action.options.onSuccess === 'function') {
      action.options.onSuccess(data);
    }
  } catch (e) {}
};

var resourceMiddleware = function resourceMiddleware(store) {
  return function (next) {
    return function (action) {
      // eslint-disable-line
      var restClient = Object(_resources__WEBPACK_IMPORTED_MODULE_1__["getResourceClient"])(action.resource);

      var onError = _onError(next, action); // apply all middlewares


      next(action);

      switch (action.type) {
        case _constants__WEBPACK_IMPORTED_MODULE_3__["GET_RESOURCE"]:
          restClient.get(action.id, action.options, action.route).then(function (result) {
            onSuccessCallback(action, result.data);
            return next(_actions__WEBPACK_IMPORTED_MODULE_0__["getResourceSuccess"](action.resource, action.id, result.data));
          }, onError);
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_3__["GET_RESOURCES"]:
          restClient.getAll(action.options, action.route).then(function (result) {
            onSuccessCallback(action, result.data);
            return next(_actions__WEBPACK_IMPORTED_MODULE_0__["getResourcesSuccess"](action.resource, result.data));
          }, onError);
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_3__["POST_RESOURCE"]:
          restClient.post(action.options, action.route).then(function (result) {
            onSuccessCallback(action, result.data);
            return next(_actions__WEBPACK_IMPORTED_MODULE_0__["postResourceSuccess"](action.resource, result.data));
          }, onError);
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_3__["PUT_RESOURCE"]:
          restClient.put(action.id, action.options, action.route).then(function (result) {
            onSuccessCallback(action, result.data);
            return next(_actions__WEBPACK_IMPORTED_MODULE_0__["putResourceSuccess"](action.resource, action.id, result.data));
          }, onError);
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_3__["DELETE_RESOURCE"]:
          restClient.delete(action.id, action.options, action.route).then(function (result) {
            onSuccessCallback(action, result.data);
            return next(_actions__WEBPACK_IMPORTED_MODULE_0__["deleteResourceSuccess"](action.resource, action.id, result.data));
          }, onError);
          break;

        default:
          break;
      }
    };
  };
};

function createResourceMiddleware() {
  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var preInterceptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var postInterceptors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (!Array.isArray(resources)) {
    throw new Error('Resources should be an array of resources');
  }

  if (resources.length === 0) {
    throw new Error('At least one resource is required');
  }

  Object(_resources__WEBPACK_IMPORTED_MODULE_1__["configResources"])(resources);

  if (!Array.isArray(preInterceptors)) {
    throw new Error('preInterceptors should be an array of functions');
  }

  Object(_interceptors__WEBPACK_IMPORTED_MODULE_2__["configPreInterceptors"])(preInterceptors);

  if (!Array.isArray(postInterceptors)) {
    throw new Error('postInterceptors should be an array of functions');
  }

  Object(_interceptors__WEBPACK_IMPORTED_MODULE_2__["configPostInterceptors"])(postInterceptors);
  return resourceMiddleware;
}

/***/ }),

/***/ "./src/reducers.js":
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resources; });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources */ "./src/resources.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */




function requestSuccessReducer(state, action) {
  var dataIdx;
  var resultState = _utils__WEBPACK_IMPORTED_MODULE_1__["updateObjectKeyValue"](state, 'loading', false);
  resultState = _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'loading'], false);

  if (action.payload.id) {
    dataIdx = resultState[action.resource].data.findIndex(function (d) {
      return "".concat(d.id) === "".concat(action.payload.id);
    });
  } else if (action.id) {
    dataIdx = resultState[action.resource].data.findIndex(function (d) {
      return "".concat(d.id) === "".concat(action.id);
    });
  }

  switch (action.method) {
    case _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].GET:
      if (action.id) {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'detail'], action.payload);
      }

      return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'data'], action.payload);

    case _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].POST:
      return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'data'], resultState[action.resource].data.concet(action.payload));

    case _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].PUT:
      // if current detail is loaded, update detail as well
      if (resultState[action.resource].detail.id === action.payload.id || typeof resultState[action.resource].detail.id === 'undefined') {
        resultState = _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'detail'], action.payload);
      }

      if (dataIdx > -1) {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'data', dataIdx], action.payload);
      } else {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'data'], resultState[action.resource].data.concet(action.payload));
      }

    case _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].DELETE:
      if (dataIdx > -1) {
        resultState = _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](resultState, [action.resource, 'detail'], {}); // remove from current resultState data

        resultState[action.resource].data.splice(dataIdx, 1);
        return resultState;
      }

      break;

    default:
      break;
  }

  return resultState;
}

function resources() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _utils__WEBPACK_IMPORTED_MODULE_1__["deepClone"](_objectSpread({
    loading: false
  }, Object(_resources__WEBPACK_IMPORTED_MODULE_0__["getInitialReducerState"])()));
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_2__["POST_RESOURCE"]:
    case _constants__WEBPACK_IMPORTED_MODULE_2__["GET_RESOURCES"]:
      {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](_utils__WEBPACK_IMPORTED_MODULE_1__["updateObjectKeyValue"](state, 'loading', true), [action.resource, 'loading'], true);
      }

    case _constants__WEBPACK_IMPORTED_MODULE_2__["PUT_RESOURCE"]:
      {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](_utils__WEBPACK_IMPORTED_MODULE_1__["updateObjectKeyValue"](state, 'loading', true), [action.resource, 'loading'], true);
      }

    case _constants__WEBPACK_IMPORTED_MODULE_2__["GET_RESOURCE"]:
    case _constants__WEBPACK_IMPORTED_MODULE_2__["DELETE_RESOURCE"]:
      {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](_utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](_utils__WEBPACK_IMPORTED_MODULE_1__["updateObjectKeyValue"](state, 'loading', true), [action.resource, 'loading'], true), [action.resource, 'detail'], {});
      }

    case _constants__WEBPACK_IMPORTED_MODULE_2__["REQUEST_SUCCESS"]:
      return requestSuccessReducer(state, action);

    case _constants__WEBPACK_IMPORTED_MODULE_2__["REQUEST_ERROR"]:
    case _constants__WEBPACK_IMPORTED_MODULE_2__["RUNTIME_ERROR"]:
      {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](_utils__WEBPACK_IMPORTED_MODULE_1__["updateObjectKeyValue"](state, 'loading', false), [action.resource, 'loading'], false);
      }

    case _constants__WEBPACK_IMPORTED_MODULE_2__["CLEAR_RESOURCE_DATA"]:
      return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](state, [action.resource, 'data'], []);

    case _constants__WEBPACK_IMPORTED_MODULE_2__["CLEAR_RESOURCE_DETAIL"]:
      return _utils__WEBPACK_IMPORTED_MODULE_1__["updateInObjectKeyValue"](state, [action.resource, 'detail'], {});
    // return to initial state

    case _constants__WEBPACK_IMPORTED_MODULE_2__["CLEAR_ALL"]:
      return _utils__WEBPACK_IMPORTED_MODULE_1__["deepClone"](_objectSpread({
        loading: false
      }, Object(_resources__WEBPACK_IMPORTED_MODULE_0__["getInitialReducerState"])()));

    default:
      break;
  }

  return state;
}

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/*! exports provided: request, _get, _post, _put, _delete, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_get", function() { return _get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_post", function() { return _post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_put", function() { return _put; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_delete", function() { return _delete3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RestClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */




var _processResource = function _processResource(interceptor, resource, method) {
  // resources filter is defined
  if (interceptor.resources && Array.isArray(interceptor.resources)) {
    // check resource filter, if there is a resource match
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = interceptor.resources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var interRes = _step.value;

        // find the matching resource
        if (interRes.resource === resource) {
          if (!interRes.methods || (Array.isArray(interRes.methods) && interRes.methods.indexOf(method)) > -1) {
            // this is the match resource and method, check if we want to exclude or include this resource
            if (interceptor.exclude) {
              return false;
            }

            return true;
          }
        }
      } // we dont find this resource, if not exclude, we dont process this resource/method

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!interceptor.exclude) {
      return false;
    }
  }

  return true; // process this resources if the filter is not defined
};

function handleInterceptors() {
  return _handleInterceptors.apply(this, arguments);
}

function _handleInterceptors() {
  _handleInterceptors = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var interceptors,
        data,
        resource,
        method,
        _data,
        _iteratorNormalCompletion2,
        _didIteratorError2,
        _iteratorError2,
        _iterator2,
        _step2,
        inter,
        __data,
        _args6 = arguments;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            interceptors = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : [];
            data = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            resource = _args6.length > 2 ? _args6[2] : undefined;
            method = _args6.length > 3 ? _args6[3] : undefined;
            // eslint-disable-line
            _data = _objectSpread({}, data);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context6.prev = 8;
            _iterator2 = interceptors[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context6.next = 29;
              break;
            }

            inter = _step2.value;
            __data = void 0;

            if (!(typeof inter === 'function')) {
              _context6.next = 19;
              break;
            }

            _context6.next = 16;
            return inter(_data, resource);

          case 16:
            __data = _context6.sent;
            _context6.next = 25;
            break;

          case 19:
            if (!(inter && inter !== null && _typeof(inter) === 'object')) {
              _context6.next = 25;
              break;
            }

            if (!(typeof inter.interceptor === 'function')) {
              _context6.next = 25;
              break;
            }

            if (!_processResource(inter, resource, method)) {
              _context6.next = 25;
              break;
            }

            _context6.next = 24;
            return inter.interceptor(_data, resource);

          case 24:
            __data = _context6.sent;

          case 25:
            if (__data) {
              _data = __data;
            }

          case 26:
            _iteratorNormalCompletion2 = true;
            _context6.next = 10;
            break;

          case 29:
            _context6.next = 35;
            break;

          case 31:
            _context6.prev = 31;
            _context6.t0 = _context6["catch"](8);
            _didIteratorError2 = true;
            _iteratorError2 = _context6.t0;

          case 35:
            _context6.prev = 35;
            _context6.prev = 36;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 38:
            _context6.prev = 38;

            if (!_didIteratorError2) {
              _context6.next = 41;
              break;
            }

            throw _iteratorError2;

          case 41:
            return _context6.finish(38);

          case 42:
            return _context6.finish(35);

          case 43:
            return _context6.abrupt("return", _data);

          case 44:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[8, 31, 35, 43], [36,, 38, 42]]);
  }));
  return _handleInterceptors.apply(this, arguments);
}

function request(_x, _x2) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(options, resource) {
    var preInterceptors, postInterceptors, method, _options;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            preInterceptors = _interceptors__WEBPACK_IMPORTED_MODULE_1__["getPreInterceptors"]();
            postInterceptors = _interceptors__WEBPACK_IMPORTED_MODULE_1__["getPostInterceptors"]();
            method = options.method;
            _context8.next = 5;
            return handleInterceptors(preInterceptors, options, resource, method);

          case 5:
            _options = _context8.sent;
            return _context8.abrupt("return", axios__WEBPACK_IMPORTED_MODULE_0___default()(_options).then(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7(response) {
                var _response;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return handleInterceptors(postInterceptors, response, resource, method);

                      case 2:
                        _response = _context7.sent;
                        return _context7.abrupt("return", {
                          data: _response.data,
                          status: _response.status
                        });

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x10) {
                return _ref.apply(this, arguments);
              };
            }()).catch(function (e) {
              throw e;
            }));

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _request.apply(this, arguments);
}

function _get(_x3) {
  return _get2.apply(this, arguments);
}

function _get2() {
  _get2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(url) {
    var options,
        resource,
        _args9 = arguments;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
            resource = _args9.length > 2 ? _args9[2] : undefined;
            _context9.next = 4;
            return request(_objectSpread({
              method: _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].GET,
              url: url
            }, options), resource);

          case 4:
            return _context9.abrupt("return", _context9.sent);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _get2.apply(this, arguments);
}

function _post(_x4) {
  return _post2.apply(this, arguments);
}

function _post2() {
  _post2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(url) {
    var options,
        resource,
        _args10 = arguments;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
            resource = _args10.length > 2 ? _args10[2] : undefined;
            _context10.next = 4;
            return request(_objectSpread({
              method: _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].POST,
              url: url
            }, options), resource);

          case 4:
            return _context10.abrupt("return", _context10.sent);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _post2.apply(this, arguments);
}

function _put(_x5) {
  return _put2.apply(this, arguments);
}

function _put2() {
  _put2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(url) {
    var options,
        resource,
        _args11 = arguments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
            resource = _args11.length > 2 ? _args11[2] : undefined;
            _context11.next = 4;
            return request(_objectSpread({
              method: _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].PUT,
              url: url
            }, options), resource);

          case 4:
            return _context11.abrupt("return", _context11.sent);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _put2.apply(this, arguments);
}

function _delete3(_x6) {
  return _delete2.apply(this, arguments);
}



function _delete2() {
  _delete2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(url) {
    var options,
        resource,
        _args12 = arguments;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
            resource = _args12.length > 2 ? _args12[2] : undefined;
            _context12.next = 4;
            return request(_objectSpread({
              method: _constants__WEBPACK_IMPORTED_MODULE_2__["METHODS"].DELETE,
              url: url
            }, options), resource);

          case 4:
            return _context12.abrupt("return", _context12.sent);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _delete2.apply(this, arguments);
}

function RestClient(resource, resourceUrl) {
  return {
    getAll: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var options,
            route,
            url,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                route = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
                url = "".concat(resourceUrl).concat(route);
                _context.next = 5;
                return _get(url, options, resource);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }(),
    get: function () {
      var _get3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var options,
            route,
            url,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                route = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : '';
                url = "".concat(resourceUrl).concat(route, "/").concat(id);
                _context2.next = 5;
                return _get(url, options, resource);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function get(_x7) {
        return _get3.apply(this, arguments);
      }

      return get;
    }(),
    post: function () {
      var _post3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var options,
            route,
            url,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                route = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : '';
                url = "".concat(resourceUrl).concat(route);
                _context3.next = 5;
                return _post(url, options, resource);

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function post() {
        return _post3.apply(this, arguments);
      }

      return post;
    }(),
    put: function () {
      var _put3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var options,
            route,
            url,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                route = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : '';
                url = "".concat(resourceUrl).concat(route, "/").concat(id);
                _context4.next = 5;
                return _put(url, options, resource);

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function put(_x8) {
        return _put3.apply(this, arguments);
      }

      return put;
    }(),
    delete: function () {
      var _delete4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var options,
            route,
            url,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                route = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : '';
                url = "".concat(resourceUrl).concat(route, "/").concat(id);
                _context5.next = 5;
                return _delete3(url, options, resource);

              case 5:
                return _context5.abrupt("return", _context5.sent);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function _delete(_x9) {
        return _delete4.apply(this, arguments);
      }

      return _delete;
    }()
  };
}

/***/ }),

/***/ "./src/resources.js":
/*!**************************!*\
  !*** ./src/resources.js ***!
  \**************************/
/*! exports provided: configResources, default, getInitialReducerState, getResourceClient, getResourceActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configResources", function() { return configResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialReducerState", function() { return getInitialReducerState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourceClient", function() { return getResourceClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourceActions", function() { return getResourceActions; });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./src/request.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/actions.js");
/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */


var _resourceClients = {};
var _resourceActions = {
  clearAll: _actions__WEBPACK_IMPORTED_MODULE_1__["clearAll"]
};
var _resourceActionsMap = {};
var _initialReducers = {};

function addResource(_ref) {
  var resource = _ref.resource,
      url = _ref.url;
  _resourceClients[resource] = Object(_request__WEBPACK_IMPORTED_MODULE_0__["default"])(resource, url);

  var _resourceName = resource[0].toUpperCase() + resource.substr(1);

  var newResourceMap = {};

  _resourceActions["get".concat(_resourceName)] = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref2.id,
        options = _ref2.options,
        route = _ref2.route;

    if (id) {
      return _actions__WEBPACK_IMPORTED_MODULE_1__["getResource"](resource, id, options, route);
    }

    return _actions__WEBPACK_IMPORTED_MODULE_1__["getResources"](resource, options, route);
  };

  _resourceActions["getAll".concat(_resourceName)] = function (_ref3) {
    var options = _ref3.options,
        route = _ref3.route;
    return _actions__WEBPACK_IMPORTED_MODULE_1__["getResources"](resource, options, route);
  };

  _resourceActions["post".concat(_resourceName)] = function (_ref4) {
    var entity = _ref4.entity,
        options = _ref4.options,
        route = _ref4.route;
    return _actions__WEBPACK_IMPORTED_MODULE_1__["postResource"](resource, entity, options, route);
  };

  _resourceActions["put".concat(_resourceName)] = function (_ref5) {
    var _ref5$id = _ref5.id,
        id = _ref5$id === void 0 ? '' : _ref5$id,
        entity = _ref5.entity,
        options = _ref5.options,
        route = _ref5.route;
    return _actions__WEBPACK_IMPORTED_MODULE_1__["putResource"](resource, id, entity, options, route);
  };

  _resourceActions["delete".concat(_resourceName)] = function (_ref6) {
    var id = _ref6.id,
        options = _ref6.options,
        route = _ref6.route;
    return _actions__WEBPACK_IMPORTED_MODULE_1__["deleteResource"](resource, id, options, route);
  };

  _resourceActions["clear".concat(_resourceName, "Detail")] = function () {
    return _actions__WEBPACK_IMPORTED_MODULE_1__["clearResourceDetail"](resource);
  };

  _resourceActions["clear".concat(_resourceName, "Data")] = function () {
    return _actions__WEBPACK_IMPORTED_MODULE_1__["clearResourceData"](resource);
  }; // create a new map element reference


  newResourceMap["get".concat(_resourceName)] = _resourceActions["get".concat(_resourceName)];
  newResourceMap["getAll".concat(_resourceName)] = _resourceActions["getAll".concat(_resourceName)];
  newResourceMap["post".concat(_resourceName)] = _resourceActions["post".concat(_resourceName)];
  newResourceMap["put".concat(_resourceName)] = _resourceActions["put".concat(_resourceName)];
  newResourceMap["delete".concat(_resourceName)] = _resourceActions["delete".concat(_resourceName)];
  newResourceMap["clear".concat(_resourceName, "Detail")] = _resourceActions["clear".concat(_resourceName, "Detail")];
  newResourceMap["clear".concat(_resourceName, "Data")] = _resourceActions["clear".concat(_resourceName, "Data")];
  _resourceActionsMap[resource] = newResourceMap;
  _initialReducers[resource] = Object.assign({}, {
    data: [],
    detail: {},
    loading: false,
    total: 0
  });
}

var configResources = function configResources(resources) {
  resources.forEach(function (resource) {
    if (!resource.url || !resource.resource) {
      throw new Error('Resource must have both url and resource specified');
    } // TODO check if resource already exist


    addResource(resource);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (_resourceActions);
function getInitialReducerState() {
  return _initialReducers;
}
function getResourceClient(resource) {
  return _resourceClients[resource];
}
function getResourceActions(resource, dispatch) {
  var funcs = _resourceActionsMap[resource];

  var _resourceName = resource[0].toUpperCase() + resource.substr(1);

  var resultActions = {};

  resultActions["get".concat(_resourceName)] = function (config) {
    return dispatch(funcs["get".concat(_resourceName)](config));
  };

  resultActions["getAll".concat(_resourceName)] = function (config) {
    return dispatch(funcs["getAll".concat(_resourceName)](config));
  };

  resultActions["post".concat(_resourceName)] = function (config) {
    return dispatch(funcs["post".concat(_resourceName)](config));
  };

  resultActions["put".concat(_resourceName)] = function (config) {
    return dispatch(funcs["put".concat(_resourceName)](config));
  };

  resultActions["delete".concat(_resourceName)] = function (config) {
    return dispatch(funcs["delete".concat(_resourceName)](config));
  };

  resultActions["clear".concat(_resourceName, "Detail")] = function () {
    return dispatch(funcs["clear".concat(_resourceName, "Detail")]());
  };

  resultActions["clear".concat(_resourceName, "Data")] = function () {
    return dispatch(funcs["clear".concat(_resourceName, "Data")]());
  };

  resultActions.clearAll = function () {
    return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["clearAll"]());
  };

  return resultActions;
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isArray, deepClone, updateInObjectKeyValue, updateObjectKeyValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepClone", function() { return deepClone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateInObjectKeyValue", function() { return updateInObjectKeyValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateObjectKeyValue", function() { return updateObjectKeyValue; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Copyright (c) 2019 - present, A Working App Inc.
 */
var isObject = function isObject(val) {
  return typeof val === 'function' || toString.call(val) === '[object Object]';
};

var isPrimitive = function isPrimitive(val) {
  return _typeof(val) === 'object' ? val === null : typeof val !== 'function';
};

var isArray = function isArray(val) {
  return Array.isArray(val);
};
var deepClone = function deepClone(target) {
  if (isPrimitive(target)) {
    return target;
  }

  if (isArray(target)) {
    var r = [];
    target.forEach(function (t) {
      r.push(deepClone(t));
    });
    return r;
  }

  if (isObject(target)) {
    var _r = {};

    var _arr = Object.keys(target);

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      _r[key] = deepClone(target[key]);
    }

    return _r;
  } // by default we return target;


  return Object.assign({}, target);
};
function updateInObjectKeyValue(oldObject, keyArray, value) {
  var updatedObject = {};
  var tmpState = updatedObject; // construct the new obejct based on key value provided

  keyArray.forEach(function (_key, index) {
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
  var clonedOldObject = deepClone(oldObject);
  return Object.assign({}, clonedOldObject, updatedObject);
}
function updateObjectKeyValue(oldObject, key, value) {
  return updateInObjectKeyValue(oldObject, [key], value);
}

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/chen/git/AWorkingApp/redux-rest-middleware/index.js */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=redux-rest-middleware.js.map