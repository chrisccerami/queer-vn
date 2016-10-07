import Ember from 'ember';

export default Ember.Component.extend({
  sender: Ember.computed('cutie', 'message', function() {
    return this.get('message.incoming') ? this.get('cutie.name') : 'You';
  })
});
