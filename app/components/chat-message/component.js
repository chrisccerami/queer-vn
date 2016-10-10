import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['chat-message'],

  incomingClass: Ember.computed('message', function() {
    return this.get('message.incoming') ? 'incoming' : 'outgoing';
  })
});
