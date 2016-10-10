import Ember from 'ember';
import sleep from './../../utils/sleep';

export default Ember.Component.extend({
  classNames: ['chat-screen'],

  store: Ember.inject.service(),
  cookieStore: Ember.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('store').query('message', {
      cutieId: this.get('cutie.id')
    }).then(messages => {this.set('messages', messages);});
    this.receiveIncomingMessages();
  },

  didRender() {
    this.scrollChatToBottom();
  },

  seenMessageIds: Ember.computed('cutie', function() {
    return this.get('cookieStore').getSeenMessageIds(this.get('cutie.id'));
  }),

  seenMessages: Ember.computed('messages', 'seenMessageIds.[]', function() {
    return (this.get('messages') || []).filter(message => {
      return this.get('seenMessageIds').includes(Number.parseInt(message.get('id')));
    });
  }),

  nextMessageId: Ember.computed('seenMessages.@each', 'cutie', function() {
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

  typingMessage: Ember.computed('nextMessage.incoming', function() {
    return {incoming: this.get('nextMessage.incoming'), content: '...'};
  }),

  actions: {
    sendNextMessage() {
      this.readNext();
    }
  },

  readNext() {
    this.set('typing', true);
    sleep(1000).then(() => {
      this.set('typing', false);
      this.get('cookieStore').pushSeenMessageId(
        this.get('cutie.id'), this.get('nextMessageId')
      ); // needs to happen first
      this.get('seenMessageIds').pushObject(this.get('nextMessageId'));
      this.scrollChatToBottom();
      this.receiveIncomingMessages();
    });
  },

  receiveIncomingMessages() {
    let isIncoming = this.get('nextMessage.incoming');
    if (isIncoming) {
      this.set('currentCutieId', this.get('cutie.id'));
      sleep(this.get('nextMessage.sleepTime')).then(() => {
        let currentCutieId = this.get('currentCutieId');
        if (currentCutieId && (this.get('cutie.id') !== currentCutieId)) {
          return;
        }
        this.readNext();
      });
    }
  },

  scrollChatToBottom() {
    let element = Ember.$('.chat-screen .messages');
    element.scrollTop(element.prop("scrollHeight"));
  }
});
