'use strict';

const Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
  template: require('templates/layout-default.jade'),

  el: '#app',

  regions: {
    header: '#header',
    content: '#content',
    footer: '#footer',
    spinner: '#spinner'
  },

  direction: 'right',

  dict: {
    right: 'left',
    left: 'right'
  },

  _setDirectionClass() {
    this.getRegion('content').$el
      .addClass(`content_translate_${this.direction} content_duration_0`)
      .removeClass(`content_translate_${this.dict[this.direction]}`);
  },

  showContent() {
    this.getRegion('content').$el.removeClass(`content_translate_${this.direction} content_duration_0`);
    this.direction = 'right';
  },

  hideContent(callback) {
    this.getRegion('content').$el.addClass(`content_translate_${this.dict[this.direction]}`);
    setTimeout(callback, 300);
  },

  displayToggle(action) {
    this.hideContent(() => {
      action();
      this.getRegion('spinner').currentView.show();
      this._setDirectionClass();
    });
  },

  displayShow(delay) {
    setTimeout(() => {
      this.showContent();
      this.getRegion('spinner').currentView.hide();
    }, delay);
  }
});
