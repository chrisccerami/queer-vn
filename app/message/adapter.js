import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlForQuery(query) {
    return `/data/messages/${query.cutieId}.json`;
  }
});
