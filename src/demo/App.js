import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { createResourceMiddleware, ResourcesReducer, ResourcesActions } from '../lib';

const reducers = combineReducers({
  resources: ResourcesReducer,
});

// add a pre interceptor to add a sample default header to all request
const defaultHeader = (options = {}) => {
  let _options = { ...options };

  if(!_options.headers) {
    _options.headers = {};
  }

  _options.headers['X-Custom'] = 'custom_default_header';

  return _options;
};

const resourceMiddleware = createResourceMiddleware([{ resource: 'posts', url: 'https://jsonplaceholder.typicode.com/posts' }], [defaultHeader]);
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
