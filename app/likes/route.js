import Ember from 'ember';

export default Ember.Route.extend({
  cookieStore: Ember.inject.service(),

  model() {
    let likedIds = this.get('cookieStore').getArray('likedCutieIds');
    return this.store.findAll('cutie').then(cuties => {
      return cuties.filter(cutie => likedIds.includes(cutie.get('id').toString()));
    });
  }
});
