'use strict';

const Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: false,

  className: 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active',

  show() {
    this.$el.show();
  },

  hide() {
    this.$el.hide();
    this.$el.trigger('spinner:hide');
  }
});
