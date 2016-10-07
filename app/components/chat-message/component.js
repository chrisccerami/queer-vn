import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['chat-message'],

  sender: Ember.computed('cutie', 'message', function() {
    return this.get('message.incoming') ? this.get('cutie.name') : 'You';
  }),

  incomingClass: Ember.computed('message', function() {
    return this.get('message.incoming') ? 'incoming' : 'outgoing';
  })
});
