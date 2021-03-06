# redux-rest-middleware

### Development in progress

See example usage in ``example/src/App.js``

## Note

Version: 1.1.7+ since 1.1.7, dependency for immutabljs is removed thus all data in reducer are plain javascript object

Version: 1.0.2 this version depends on immutablejs, all data in reducer is a object of immutablejs MAP/List

## Installing

Using npm:

```bash
$ npm install redux-rest-middleware
```

## Configure with Redux

### Apply middleware to store:

```js
  import { createResourceMiddleware } from 'redux-rest-middleware';

  const resourceMiddleware = createResourceMiddleware([{ resource: 'posts', url: 'https://jsonplaceholder.typicode.com/posts' }])
  const middlewares = [resourceMiddleware];

  const store = createStore(reducers, applyMiddleware(...middlewares));
```

### (Optional) Integrate the build in reducer to manager resource

```js
  import { ResourcesReducer } from 'redux-rest-middleware';

  const reducers = combineReducers({
    resources: ResourcesReducer,
  });

```

### Dispatch REST action in React Component

- options:
    * redux-rest-middleware uses axios for network request. options is the same as axios config see [axios options](https://github.com/axios/axios#request-config)

```js
  import { ResourcesActions } from 'redux-rest-middleware';
  import React from 'react';
  import { connect } from 'react-redux';

  // For each resource { Resource } added to the middleware six actions will be created
  /**
   * e.g for resource: { resource: 'posts', url: 'https://www.example.com/posts' }
   * - ResourcesActions.getPosts({options = {}, route = ''}): Get all posts
   * - ResourcesActions.getAllPosts({options = {}, route = ''}): Get all posts, same as the above action
   * - ResourcesActions.getPosts({id, options = {}, route = ''}): Get a specific posts with id
   * - ResourcesActions.postPosts({entity, options = {}, route = ''}): Post to create a posts resource
   * - ResourcesActions.putPosts({id, entity, options = {}, route = ''}): Put to a posts resource with id specified
   * - ResourcesActions.deletePosts({id, options = {}, route = ''}): Delete a posts with specific id
   */

   // E.g
   class App extends React.PureComponent {
       componentDidMount(){
           this.props.getPosts();
       }

       render(){
           <div>posts</div>;
       }
   }

   const getPosts = ResourcesActions.getPosts;
   export default connect(null, { getPosts })(App);
```

### Action Configuration

Each action takes one config object and it is as the following:
```js
 {
     // id is required for: get specific resource, put to update resource, delete specific resource
     id: '', 

     // entity is used in put, post actions. entity is the new resource that is created or updated by the request
     entity: {}, 

     // options are same as axios request-config, without the url, id and data property
     // onSuccess and onError is defined by user, to handle success and error case of the request
     // @see https://github.com/axios/axios#request-config
     options: {
       onSuccess: (responseData) => {},
       onError: (error) => {},
       ...requestConfig
     }, 

     // this is the subroute of this request. it should starts with /
     // e.g, for url: www.example.com/posts, if route = '/me', then the request goes to www.example.com/posts/me
     // Note, if the action comes with id, then route will before the id path parameter.
     // e.g for url: www.example.com/posts, if route = '/me' and id = 1 then request goes to www.example.com/posts/me/1
     route: '', 
 }
```

## TODO
- <del>Add more configuration for interceptors</del>
- <del>Add onSuccess, onError callback</del>
- <del>Remove dependency to immutablejs and reduce the size of this library</del>
- Add more documentation about resources reducer
- Add documentation about pre and post interceptors
- Add test
- Make a more complete example
- Remove dependency to axios and reduce the size of this library
- <del>Publish to NPM repository</del>

## License
MIT
