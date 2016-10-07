import Ember from 'ember';

export default Ember.Service.extend({
  cookieService: Ember.inject.service('cookies'),

  push(key, element) {
    const cookieService = this.get('cookieService');
    let value = this.arrayify(cookieService.read(key));
    value.push(element);
    cookieService.write(key, JSON.stringify(value));
  },

  getArray(key) {
    const cookieService = this.get('cookieService');
    return this.arrayify(cookieService.read(key));
  },

  writeKeyValue(key, objectKey, objectValue) {
    const cookieService = this.get('cookieService');
    let value = this.objectify(cookieService.read(key));
    value.objectKey = objectValue;
    cookieService.write(key, JSON.stringify(value));
  },

  getObjectValue(key, objectKey) {
    const cookieService = this.get('cookieService');
    return this.objectify(cookieService.read(key)).objectKey;
  },

  clear(key) {
    const cookieService = this.get('cookieService');
    cookieService.clear(key);
  },

  clearAll() {
    const cookieService = this.get('cookieService');
    Object.keys(cookieService.read()).forEach((key) => {
      this.clear(key);
    });
  },

  arrayify(value) {
    return parsedWithDefault(value, []);
  },

  objectify(value) {
    return parsedWithDefault(value, {});
  },

  parsedWithDefault(value, defaultValue) {
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  }
});
