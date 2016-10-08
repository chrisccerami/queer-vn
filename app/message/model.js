import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  incoming: DS.attr('boolean'),
  goTo: DS.attr('number'),
  sleepTime: DS.attr('number')
});
