'use strict';

const $ = require('jquery');
Backbone.Wreqr = require('backbone.wreqr');
const Marionette = require('backbone.marionette');
const InitInputBehavior = require('behaviors/InitInput');

module.exports = Marionette.ItemView.extend({
  template: require('templates/view-register-enter-email.jade'),
  className: 'mdl-grid',
  tagName: 'form',

  initialize() {
    this.$el.on('submit', event => {
      event.stopPropagation();
      event.preventDefault();

      const email = $(event.target).find('#email').val();

      this.channel.vent.trigger('auth:email', email);
    });
  },

  behaviors: {
    onRender: {
      behaviorClass: InitInputBehavior
    }
  },

  channel: Backbone.Wreqr.radio.channel('register')
});
