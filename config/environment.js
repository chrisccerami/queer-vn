module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bi-felicia',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {}
  };

  return ENV;
};
