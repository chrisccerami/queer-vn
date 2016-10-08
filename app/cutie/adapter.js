import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlForFindAll() {
    return '/data/cuties.json';
  }
});
