'use strict';

const $ = require('jquery');
const Marionette = require('backbone.marionette');

module.exports = Marionette.Behavior.extend({
  onRender() {
    this.$el.find('.js-input').each(function () {
      new MaterialTextfield($(this).parent().get(0));
    });
  }
});
