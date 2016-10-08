import Ember from 'ember';

export default function sleep(milliseconds) {
  return new Ember.RSVP.Promise((resolve) => setTimeout(resolve, milliseconds));
}
