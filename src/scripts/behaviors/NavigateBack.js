'use strict';

const Backbone = require('backbone');
const Marionette = require('backbone.marionette');

module.exports = Marionette.Behavior.extend({
  globalChanel: Backbone.Wreqr.radio.channel('global'),

  events: {
    'click @ui.back': 'navigateBack'
  },

  navigateBack() {
    this.globalChanel.reqres.request('navigate:back');
  }
});
