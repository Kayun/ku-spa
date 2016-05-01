'use strict';

const $ = require('jquery');
Backbone.Wreqr = require('backbone.wreqr');
const Marionette = require('backbone.marionette');
const InitInputBehavior = require('behaviors/InitInput');

module.exports = Marionette.ItemView.extend({
  template: require('templates/view-register-enter-invite.jade'),
  className: 'mdl-grid',
  tagName: 'form',

  initialize() {
    this.$el.on('submit', event => {
      event.stopPropagation();
      event.preventDefault();

      this.channel.vent.trigger('seller:register');
    });
  },

  ui: {
    camera: '.js-camera-button'
  },

  behaviors: {
    onRender: {
      behaviorClass: InitInputBehavior
    }
  },

  channel: Backbone.Wreqr.radio.channel('register')
});
