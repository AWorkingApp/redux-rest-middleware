
const _preInterceptors = [];
const _postInterceptors = [];

export function addPreInterceptor(preInter = (options = {}) => { }){
    _preInterceptors.push(preInter);
}

export function addPostInterceptor(postInter = (result = {}) => { }){
    _postInterceptors.push(postInter);
}

export function getPreInterceptors() {
    return _preInterceptors;
} 

export function getPostInterceptors() {
    return _postInterceptors;
}
