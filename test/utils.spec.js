import * as Utils from '../src/utils';

import chai from 'chai';

const { expect } = chai;

// TODO Add acutal test
// Replace with actual tests
describe('test deepClone', () => {
  it('it should clone the nested property of a object', () => {
    let person = {
      name: 'james',
      address: {
        city: 'Miami'
      }
    };

    let newPerson = Utils.deepClone(person);

    expect(newPerson.name).to.be.eql('james');
    expect(newPerson.address.city).to.be.eql('Miami');
    // update nested property in person
    person.address.city = 'Cleveland';
    expect(person.address.city).to.be.eql('Cleveland');
    expect(newPerson.address.city).to.be.eql('Miami');
  });
});

// TODO Add acutal test
// Replace with actual tests
describe('test updateInObjectKeyValue', () => {
  it('it should update nested value in object', () => {
    let oldObject = { person: { name: 'old', age: 12 } };
    let newObject = Utils.updateInObjectKeyValue(oldObject, ['person', 'name'], 'new');
    expect(newObject.person.name).to.be.eql('new');
    expect(newObject.person.age).to.be.eql(12);

    // old object should not change
    expect(oldObject.person.name).to.be.eql('old');
    expect(oldObject.person.age).to.be.eql(12);
  });

  it('it should create new value if key does not exsit in old object', () => {
    let oldObject = { person: { name: 'old', age: 12 }, friends: [] };
    let newObject = Utils.updateInObjectKeyValue(oldObject, ['person', 'address'], 'home st');
    expect(newObject.person.name).to.be.eql('old');
    expect(newObject.person.age).to.be.eql(12);
    expect(newObject.person.address).to.be.eql('home st');

    // old object should not change
    expect(oldObject.person.name).to.be.eql('old');
    expect(oldObject.person.age).to.be.eql(12);
    expect(oldObject.person.address).to.be.undefined;
    expect(oldObject.friends).not.to.be.undefined;
  });

  it('it should update create a new object even if value is a object', () => {
    let oldObject = { person: { name: 'old', age: 12, address: { street: 'street name' } }, friends: [] };
    let updateObject = { street: 'new street name' };

    let newObject = Utils.updateInObjectKeyValue(oldObject, ['person', 'address'], updateObject);

    // old object should not change
    expect(oldObject.person.name).to.be.eql('old');
    expect(oldObject.person.age).to.be.eql(12);
    expect(oldObject.person.address.street).to.be.eql('street name');

    // updated object value
    expect(newObject.person.name).to.be.eql('old');
    expect(newObject.person.age).to.be.eql(12);
    expect(newObject.person.address.street).to.be.eql('new street name');

    // update object should be independent from newObject
    updateObject.street = 'another street name';
    expect(updateObject.street).to.be.eql('another street name');
    expect(newObject.person.address.street).to.be.eql('new street name');
  });

  it('it should update element in array with index', () => {
    let oldObject = {
      person: { name: 'old', age: 12, address: { street: 'street name' } },
      friends: [{
        name: 'james'
      }, {
        name: 'curry'
      }]
    };

    let newObject = Utils.updateInObjectKeyValue(oldObject, ['friends', 1, 'name'], 'klay');
    expect(newObject.friends[1].name).to.be.eql('klay');
  });

  it('it should use array as new value type', () => {
    let oldObject = {
      person: { name: 'old', age: 12, address: { street: 'street name' } },
      friends: [{
        name: 'james'
      }, {
        name: 'curry'
      }]
    };

    let updateArray = [{
      name: 'kevin'
    }];

    let newObject = Utils.updateInObjectKeyValue(oldObject, ['friends'], updateArray);
    expect(newObject.friends[0].name).to.be.eql('kevin');

    // update updateArray and make sure newObject is not a reference to updateArray
    updateArray[0].name = 'klay';
    updateArray.push({ name: 'davis' });

    expect(newObject.friends[0].name).to.be.eql('kevin');
    expect(newObject.friends.length).to.be.eql(1);

    expect(updateArray[0].name).to.be.eql('klay');
    expect(updateArray[1].name).to.be.eql('davis');

    expect(updateArray.length).to.be.eql(2);
  });

});