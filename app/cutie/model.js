import DS from 'ember-data';
import Ember from 'ember';

Ember.Inflector.inflector.irregular('cutie', 'cuties');

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  age: DS.attr('number'),
  description: DS.attr('string'),
  photoFilename: DS.attr('string'),

  name: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`.trim();
  })
});
