import Ember from 'ember';

export default Ember.Service.extend({
  cookieService: Ember.inject.service('cookies'),

  push(key, element) {
    this.writeToStructure([], key, element);
  },

  pushSeenMessageId(cutieId, messageId) {
    let cookieService = this.get('cookieService');
    let seenMessageIds = this.objectify(cookieService.read('seenMessageIds'));
    if (seenMessageIds[cutieId.toString()]) {
      seenMessageIds[cutieId.toString()].push(messageId)
    } else {
      seenMessageIds[cutieId.toString()] = [1, messageId];
    }
    this.get('cookieService').write('seenMessageIds', JSON.stringify(seenMessageIds));
  },

  getSeenMessageIds(cutieId) {
    let seenMessageIds = this.getObjectValue('seenMessageIds', cutieId) || [1];
    return seenMessageIds;
  },

  writeKeyValue(key, objectKey, objectValue) {
    this.writeToStructure({}, key, objectKey, objectValue);
  },

  writeToStructure(defaultStructure, key, element, value) {
    const cookieService = this.get('cookieService');
    let structure = this.parsedWithDefault(cookieService.read(key), defaultStructure);
    if (Array.isArray(structure)) {
      structure.push(element);
    } else {
      structure.element = value;
    }
    cookieService.write(key, JSON.stringify(structure));
  },

  getArray(key) {
    const cookieService = this.get('cookieService');
    return this.arrayify(cookieService.read(key));
  },

  getObjectValue(key, objectKey) {
    const cookieService = this.get('cookieService');
    return this.objectify(cookieService.read(key))[objectKey];
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
    return this.parsedWithDefault(value, []);
  },

  objectify(value) {
    return this.parsedWithDefault(value, {});
  },

  parsedWithDefault(value, defaultValue) {
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  }
});
