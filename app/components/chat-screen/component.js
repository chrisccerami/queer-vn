import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['chat-screen'],

  store: Ember.inject.service(),

  messages: Ember.computed('cutie', function() {
    return this.get('store').query('message', {
      cutieId: this.get('cutie.id')
    });
  })
});
