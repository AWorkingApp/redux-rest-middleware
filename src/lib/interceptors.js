
// TODO add include and exclude for inters
/*
{
    interceptor: (options, resource) => {},
    exclude: false, // include or excludes all the filtered resource,
    resources: [{resource: '', methods: []}]
}
*/
const _preInterceptors = [];
const _postInterceptors = [];

export const configPreInterceptors = (preInterceptors = []) => {
    preInterceptors.forEach((preInterceptor) => {
        if(typeof preInterceptor !== 'function'){
            throw new Error('preInteceptor must be a function');
        }

        addPreInterceptor(preInterceptor);
    });
}

function addPreInterceptor(preInter = (options = {}, resource) => { }) {
    _preInterceptors.push(preInter);
}

export const configPostInterceptors = (postInterceptors = []) => {
    postInterceptors.forEach((postInterceptor) => {
        if(typeof postInterceptor !== 'function'){
            throw new Error('preInteceptor must be a function');
        }

        addPostInterceptor(postInterceptor);
    });
}

function addPostInterceptor(postInter = (result = {}, resource) => { }){
    _postInterceptors.push(postInter);
}

export function getPreInterceptors() {
    return _preInterceptors;
} 

export function getPostInterceptors() {
    return _postInterceptors;
}
