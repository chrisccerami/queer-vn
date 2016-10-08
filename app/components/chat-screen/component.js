import Ember from 'ember';
import sleep from './../../utils/sleep';

export default Ember.Component.extend({
  classNames: ['chat-screen'],

  store: Ember.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('seenMessageIds', [1]);
    this.get('store').query('message', {
      cutieId: this.get('cutie.id')
    }).then(messages => {this.set('messages', messages);});
  },

  seenMessages: Ember.computed('messages', 'seenMessageIds.[]', function() {
    return (this.get('messages') || []).filter(message => {
      return this.get('seenMessageIds').includes(Number.parseInt(message.get('id')));
    });
  }),

  nextMessageId: Ember.computed('seenMessages.@each', function() {
    return this.get('seenMessages.lastObject.goTo');
  }),

  nextMessage: Ember.computed('nextMessageId', function() {
    if (this.get('messages')) {
      return this.get('messages').findBy('id', this.get('nextMessageId').toString());
    } else {
      return {};
    }
  }),

  disableSendButton: Ember.computed.bool('nextMessage.incoming'),

  actions: {
    sendNextMessage() {
      this.readNext();
    }
  },

  readNext() {
    this.get('seenMessageIds').pushObject(this.get('nextMessageId'));
    this.receiveIncomingMessages();
  },

  receiveIncomingMessages() {
    if (this.get('nextMessage.incoming')) {
      sleep(this.get('nextMessage.sleepTime')).then(() => {
        this.readNext();
      });
    }
  }
});
