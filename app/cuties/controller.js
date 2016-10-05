import Ember from 'ember';

export default Ember.Controller.extend({
  currentCutie: Ember.computed('model', function() {
    return Ember.get(this, 'model.firstObject');
  })
});
