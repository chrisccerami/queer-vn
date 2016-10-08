import Ember from 'ember';
import sleep from './../../utils/sleep';

export default Ember.Component.extend({
  classNames: ['chat-message'],

  init() {
    this._super(...arguments);
    this.set('typing', true);
    sleep(1000).then(()=> {
      this.set('typing', false);
    });
  },

  incomingClass: Ember.computed('message', function() {
    return this.get('message.incoming') ? 'incoming' : 'outgoing';
  })
});
