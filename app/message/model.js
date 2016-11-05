import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  content: DS.attr('string'),
  incoming: DS.attr('boolean'),
  goTo: DS.attr('number'),
  sleepTime: DS.attr('number'),

  outgoing: Ember.computed.not('incoming')
});
