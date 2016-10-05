import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      {firstName: "Lee", lastName: "Détroit", age: 22, description: "Adorable Montreal native, art student"},
      {firstName: "Fran", lastName: "", age: 25, description: "Drag king, bard, mystery"}
    ];
  }
});
