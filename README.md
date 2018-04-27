## redux-rest-middleware

### Development in progress

See example usage in ``src/demo/App.js``

## Installing

Using npm:

```bash
$ npm install git+https://github.com/AWorkingApp/redux-rest-middleware.git
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
   * - ResourceActions.getPosts({options = {}, route = ''}): Get all posts
   * - ResourceActions.getAllPosts({options = {}, route = ''}): Get all posts, same as the above action
   * - ResourceActions.getPosts({id, options = {}, route = ''}): Get a specific posts with id
   * - ResourceActions.postPosts({entity, options = {}, route = ''}): Post to create a posts resource
   * - ResourceActions.putPosts({id, entity, options = {}, route = ''}): Put to a posts resource with id specified
   * - ResourceActions.deletePosts({id, options = {}, route = ''}): Delete a posts with specific id
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
     // @see https://github.com/axios/axios#request-config
     options: {}, 

     // this is the subroute of this request. it should starts with /
     // e.g, for url: www.example.com/posts, if route = '/me', then the request goes to www.example.com/posts/me
     // Note, if the action comes with id, then route will before the id path parameter.
     // e.g for url: www.example.com/posts, if route = '/me' and id = 1 then request goes to www.example.com/posts/me/1
     route = '', 
 }
```

## TODO
- Add more documentation about resources reducer
- Add documentation about pre and post interceptors
- Add test
- Make a more complete example
- Remove dependency to immutablejs and axios and reduce the size of this library
- Public to NPM repository

## License
MIT