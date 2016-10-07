import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    select(cutie) {
      this.set('activeCutie', cutie);
    }
  }
});
