import Ember from 'ember';

export default Ember.Controller.extend({
  cookieStore: Ember.inject.service(),

  currentCutie: Ember.computed('model.@each', function() {
    return this.get('model.firstObject');
  }),

  actions: {
    rejectCutie(cutie) {
      this.get('cookieStore').push('seen', cutie.id);
      this.get('model').removeObject(cutie);
    },

    likeCutie(cutie) {
      let cookies = this.get('cookieStore');
      cookies.push('seen', cutie.id);
      cookies.push('liked', cutie.id);
      this.get('model').removeObject(cutie);
    }
  }
});
