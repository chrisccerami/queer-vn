import Ember from 'ember';

export default Ember.Route.extend({
  cookieStore: Ember.inject.service(),

  model() {
    // this.get('cookieStore').clearAll(); // for development purposes only
    let seenIds = this.get('cookieStore').getArray('seenCutieIds');
    return this.store.findAll('cutie').then(cuties => {
      return cuties.reject(cutie => seenIds.includes(cutie.get('id').toString()));
    });
  }
});
