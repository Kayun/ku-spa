'use strict';

const Marionette = require('backbone.marionette');
const User = require('models/User');

module.exports = Marionette.LayoutView.extend({
  template: require('templates/layout-register.jade'),

  className: 'mdl-grid enter-inner',

  regions: {
    content: '#register-content',
    title: '#register-title'
  },

  globalChanel: Backbone.Wreqr.radio.channel('global'),

  initialize() {
    this.getRegion('content')
      .on('show', () => {
        this.globalChanel.vent.trigger('content:load', this);
      });
  }
});
