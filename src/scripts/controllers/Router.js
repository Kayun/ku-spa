'use strict';

const Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    'register(/:method)': 'register',
    profile: 'profile',
    '(/)': 'index'
  }
});
