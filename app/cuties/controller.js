import Ember from 'ember';

export default Ember.Controller.extend({
  cookieStore: Ember.inject.service(),

  currentCutie: Ember.computed('model.[]', function() {
    return this.get('model.firstObject');
  }),

  actions: {
    rejectCutie(cutie) {
      this.get('cookieStore').push('seenCutieIds', cutie.id);
      this.get('model').removeObject(cutie);
    },

    likeCutie(cutie) {
      let cookies = this.get('cookieStore');
      cookies.push('seenCutieIds', cutie.id);
      cookies.push('likedCutieIds', cutie.id);
      this.get('model').removeObject(cutie);
    },

    clearSave() {
      this.get('cookieStore').clearAll();
      window.location.reload();
    }
  }
});
