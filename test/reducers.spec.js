// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
import resourceReducer from '../src/reducers';

import chai from 'chai';
import * as Consts from '../src/constants';

const { expect } = chai;

describe('test resources reducer request actions', () => {
  let initialState = {};

  beforeEach(() => {
    initialState = {
      students: {
        data: [],
        detail: {
          id: 0,
          name: 'james'
        },
        loading: false,
        total: 0
      },
      staffs: {
        data: [],
        detail: {
          id: 1,
          name: 'bob'
        },
        loading: false,
        total: 0
      }
    };
  });

  it('it should start loading after GET_RESOURCES request sent', () => {
    expect(initialState.students.loading).to.be.eql(false);
    expect(initialState.students.detail.name).to.be.eql('james');

    let currState = resourceReducer(initialState, {
      type: Consts.GET_RESOURCES,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(true);
    expect(currState.students.detail.name).to.be.eql('james');

    expect(currState.staffs.loading).to.be.eql(false);
    expect(currState.staffs.detail.name).to.be.eql('bob');
  });

  it('it should start loading after POST_RESOURCE request sent', () => {
    expect(initialState.students.loading).to.be.eql(false);
    expect(initialState.students.detail.name).to.be.eql('james');

    let currState = resourceReducer(initialState, {
      type: Consts.POST_RESOURCE,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(true);
    expect(currState.students.detail.name).to.be.eql('james');

    expect(currState.staffs.loading).to.be.eql(false);
    expect(currState.staffs.detail.name).to.be.eql('bob');
  });

  it('it should start loading and keep current state defailt after PUT_RESOURCE request sent', () => {
    expect(initialState.students.loading).to.be.eql(false);
    expect(initialState.students.detail.name).to.be.eql('james');

    let currState = resourceReducer(initialState, {
      type: Consts.PUT_RESOURCE,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(true);
    expect(currState.students.detail.name).to.be.eql('james');

    expect(currState.staffs.loading).to.be.eql(false);
    expect(currState.staffs.detail.name).to.be.eql('bob');
  });

  it('it should start loading and keep current state defailt after GET_RESOURCE request sent', () => {
    expect(initialState.students.loading).to.be.eql(false);
    expect(initialState.students.detail.name).to.be.eql('james');

    let currState = resourceReducer(initialState, {
      type: Consts.GET_RESOURCE,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(true);
    expect(currState.students.detail.name).to.be.undefined;

    expect(currState.staffs.loading).to.be.eql(false);
    expect(currState.staffs.detail.name).to.be.eql('bob');
  });

});

describe('test resources reducer request error actions', () => {
  let initialState = {};

  beforeEach(() => {
    initialState = {
      students: {
        data: [],
        detail: {
          id: 0,
          name: 'james'
        },
        loading: false,
        total: 0
      },
      staffs: {
        data: [],
        detail: {
          id: 1,
          name: 'bob'
        },
        loading: false,
        total: 0
      }
    };
  });

  it('it should set loading to false after REQUEST_ERROR request sent', () => {
    expect(initialState.students.loading).to.be.eql(false);
    expect(initialState.students.detail.name).to.be.eql('james');

    let currState = resourceReducer(initialState, {
      type: Consts.GET_RESOURCE,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(true);
    expect(currState.students.detail.name).to.be.undefined;

    currState = resourceReducer(currState, {
      type: Consts.REQUEST_ERROR,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(false);
    expect(currState.students.detail.name).to.be.undefined;

    expect(currState.staffs.loading).to.be.eql(false);
    expect(currState.staffs.detail.name).to.be.eql('bob');
  });

  it('it should set loading to false after RUNTIME_ERROR request sent', () => {
    expect(initialState.students.loading).to.be.eql(false);
    expect(initialState.students.detail.name).to.be.eql('james');

    let currState = resourceReducer(initialState, {
      type: Consts.GET_RESOURCE,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(true);
    expect(currState.students.detail.name).to.be.undefined;

    currState = resourceReducer(currState, {
      type: Consts.RUNTIME_ERROR,
      resource: 'students',
      options: {},
      route: ''
    });

    expect(currState.students.loading).to.be.eql(false);
    expect(currState.students.detail.name).to.be.undefined;

    expect(currState.staffs.loading).to.be.eql(false);
    expect(currState.staffs.detail.name).to.be.eql('bob');
  });

});
