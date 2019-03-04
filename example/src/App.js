import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { createResourceMiddleware, ResourcesReducer, ResourcesActions, METHODS } from '../../dist/redux-rest-middleware.js';

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

const resourceMiddleware = createResourceMiddleware([{ resource: 'posts', url: 'https://jsonplaceholder.typicode.com/posts' }], 
  [defaultHeader, additionalHeaderOne, additionalHeaderTwo], [defaultPostCheck]);
const middlewares = [resourceMiddleware];

const store = createStore(reducers, applyMiddleware(...middlewares));

class App extends React.PureComponent {

  state = {
      posts: [],
      postsDetail: {},
      loadingDetail: false,
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        posts: store.getState().resources.posts.data,
        postsDetail: store.getState().resources.posts.detail
      });
    });
  }

  render() {
    return <div>
      <button onClick={() => {
        this.setState({
          loading: true
        }, () => {
          store.dispatch(ResourcesActions.getPosts({
            id: 'does_not_exist',
            options: {
              onSuccess: (d) => {
                this.setState({
                  loading: false
                });
              },
              onError: (e) => {
                alert(`error: ${e}`);
                this.setState({
                  loading: false
                });
              }
            }
          }));
        });
      }}>
        Load posts with error
      </button>
      <button onClick={() => {
        this.setState({
          loading: true
        }, () => {
          store.dispatch(ResourcesActions.getPosts({
            options: {
              onSuccess: (d) => {
                this.setState({
                  loading: false
                });
              }
            }
          }));
        });
      }}>
        Load posts
      </button>
      <button onClick={() => {
        store.dispatch(ResourcesActions.clearPostsData());
      }}>
        Clear All Posts
      </button>
      <button onClick={() => {
        store.dispatch(ResourcesActions.clearPostsDetail());
      }}>
        Clear Post
      </button>
      <button onClick={() => {
        store.dispatch(ResourcesActions.clearAll());
      }}>
        Clear All
      </button>
      <br />
      {
        this.state.loading
          ? 'Loading ...'
          : ` total posts: ${this.state.posts.length}`
      }
      <br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                <button onClick={() => {
                  this.setState({
                    loadingDetail: true
                  }, () => {
                    store.dispatch(ResourcesActions.getPosts({
                      id: post.id,
                      options: {
                        onSuccess: (d) => {

                          this.setState({
                            loadingDetail: false
                          });
                        },
                        onError: (e) => {
                          alert(`error: ${e}`);
                          this.setState({
                            loadingDetail: false
                          });
                        }
                      }
                    }));
                  });
                }}>
                  Get Detail
              </button>
                <hr />
              </div>
            )
          }
        </div>
        <div style={{ width: '300px', marginLeft: 24 }}>
          <h4>
            Post Detail
          </h4>
          <h5>
            id: {this.state.postsDetail.id}
          </h5>
          <h5>
            title: {this.state.postsDetail.title}
          </h5>
          <span>
            content: {this.state.postsDetail.body}
          </span>
        </div>
      </div>
    </div>
  }
}

export default App;
