
/*
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
const _preInterceptors = [];
const _postInterceptors = [];

export const configPreInterceptors = (preInterceptors = []) => {
    preInterceptors.forEach((preInterceptor) => {
        if(!_validInterceptor(preInterceptor)){
            throw new Error('preInteceptor must be a function or a object');
        }

        addPreInterceptor(preInterceptor);
    });
}

function addPreInterceptor(preInter = (options = {}, resource) => { }) {
    _preInterceptors.push(preInter);
}

export const configPostInterceptors = (postInterceptors = []) => {
    postInterceptors.forEach((postInterceptor) => {
        if(!_validInterceptor(postInterceptor)){
            throw new Error('postInteceptor must be a function');
        }

        addPostInterceptor(postInterceptor);
    });
}

function addPostInterceptor(postInter = (result = {}, resource) => { }){
    _postInterceptors.push(postInter);
}

const _validInterceptor = (interceptor) => {
    if (typeof interceptor !== 'function' &&
        (interceptor === null || typeof interceptor !== 'object')
    ) {
        return false;
    }

    return true;
}

export function getPreInterceptors() {
    return _preInterceptors;
} 

export function getPostInterceptors() {
    return _postInterceptors;
}
