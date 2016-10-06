import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlForFindAll(modelName) {
    return '/assets/cuties.json';
  }
});
