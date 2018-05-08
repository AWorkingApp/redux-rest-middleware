import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { createResourceMiddleware, ResourcesReducer, ResourcesActions, METHODS } from '../lib';

const reducers = combineReducers({
  resources: ResourcesReducer,
});

// add a pre interceptor to add a sample default header to all request
const defaultHeader = (options = {}, resource) => {
  let _options = { ...options };

  if(!_options.headers) {
    _options.headers = {};
  }

  _options.headers['X-Custom'] = 'custom_default_header';

  return _options;
};

// an additional header interceptor, this should not be called
const additionalHeaderOne = {
  interceptor: (options = {}, resource) => {
    let _options = { ...options };

    if (!_options.headers) {
      _options.headers = {};
    }

    _options.headers['X-Additional-One'] = 'additional one header, this is not included';

    return _options;
  },

  exclude: true,
  resources: [{
    resource: 'posts',
    methods: [METHODS.GET]
  }]
};

// an additional header interceptor, this should be called
const additionalHeaderTwo = {
  interceptor: (options = {}, resource) => {
    let _options = { ...options };

    if (!_options.headers) {
      _options.headers = {};
    }

    _options.headers['X-Additional-Two'] = 'additional two header, this is included';

    return _options;
  },

  resources: [{
    resource: 'posts',
    methods: [METHODS.GET]
  }]
};

const defaultPostCheck = (response, resource) => {
  return response;
};

// const resourceMiddleware = createResourceMiddleware([{ resource: 'posts', url: 'https://jsonplaceholder.typicode.com/posts' }], [defaultHeader]);
const resourceMiddleware = createResourceMiddleware([{ resource: 'posts', url: 'http://localhost:3000/posts' }], 
  [defaultHeader, additionalHeaderOne, additionalHeaderTwo], [defaultPostCheck]);
const middlewares = [resourceMiddleware];

const store = createStore(reducers, applyMiddleware(...middlewares));

class App extends React.PureComponent {

  state = {
      posts: [],
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ posts: store.getState().resources.get('posts').get('data').toJS() });
    });
  }

  render() {
    return <div>
      <button onClick={() => {
        store.dispatch(ResourcesActions.getPosts())
      }}>
        Load posts
      </button>
      <br/>
      {` total posts: ${this.state.posts.length}`}
      <br/>
      <div style={{ width: '400px', height: '400px', overflowX: 'hidden', overflowY: 'scroll' }}>
      {
        this.state.posts.map(post => 
            <div key={post.id}>
              <h5>
                {`${post.title}`}
              </h5>
              <span>
                {`${post.body}`}
              </span>
              <hr />
            </div>
        )
      }
      </div>
    </div>
  }
}

export default App;
