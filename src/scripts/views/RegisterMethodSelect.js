'use strict';

const $ = require('jquery');
const Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: require('templates/view-register-method-select.jade'),
  className: 'mdl-grid',

  channel: Backbone.Wreqr.radio.channel('register'),

  ui: {
    button: '.js-select-method-btn'
  },

  events: {
    'click @ui.button': 'onClickButton'
  },

  onClickButton(event) {
    const $target = $(event.target);
    let $button;
    if ($target.hasClass('material-icons')) {
      $button = $target.parent();
    } else {
      $button = $target;
    }

    const registerMethod = $button.data('method');
    this.channel.vent.trigger('auth:social', registerMethod);
  },

  register(event) {
    const $button = $(event.target);
    console.log(this.ui.button);
    if (!$button.closest()) return false;

    const registerMethod = $button.data('method');

  }
});
