import Ember from 'ember';

export default Ember.Route.extend({
  cookieStore: Ember.inject.service(),

  model() {
    this.get('cookieStore').clearAll(); // for development purposes only

    let cuties = [
      {id: 1, firstName: "Lee", lastName: "Détroit", age: 22, description: "Adorable Montreal native, art student"},
      {id: 2, firstName: "Fran", lastName: "", age: 25, description: "Drag king, bard, mystery"}
    ];
    let seenIds = this.get('cookieStore').getArray('seen');
    return cuties.reject((cutie) => seenIds.includes(cutie.id.toString()));
  }
});
