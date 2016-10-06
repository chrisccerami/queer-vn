import Ember from 'ember';

export default Ember.Route.extend({
  cookieStore: Ember.inject.service(),

  model() {
    let cuties = [
      {id: 1, firstName: "Lee", lastName: "Détroit", age: 22, description: "Adorable Montreal native, art student"},
      {id: 2, firstName: "Fran", lastName: "", age: 25, description: "Drag king, bard, mystery"}
    ];
    let likedIds = this.get('cookieStore').getArray('liked');
    return cuties.filter((cutie) => likedIds.includes(cutie.id.toString()));
  }
});
