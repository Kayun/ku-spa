'use strict';

Backbone.Wreqr = require('backbone.wreqr');
const Marionette = require('backbone.marionette');
const InitInputBehavior = require('behaviors/InitInput');

module.exports = Marionette.ItemView.extend({
  template: require('templates/view-profile.jade'),
  className: 'mdl-grid',
  tagName: 'form',

  initialize() {
    this.$el.on('submit', event => {
      event.stopPropagation();
      event.preventDefault();

      this.globalChanel.vent.trigger('profile:send', email);
    });
  },

  behaviors: {
    onRender: {
      behaviorClass: InitInputBehavior
    }
  },

  onShow() {
    this.globalChanel.vent.trigger('content:load', this);
  },

  globalChanel: Backbone.Wreqr.radio.channel('global')
});
