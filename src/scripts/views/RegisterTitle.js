'use strict';

const Marionette = require('backbone.marionette');
const TitleUpgradeBehavior = require('behaviors/TitleUpgrade');

module.exports = Marionette.ItemView.extend({
  template: false,

  tagName: 'h6',
  className: 'enter__title align-center js-title',

  behaviors: {
    titleUpgrade: {
      behaviorClass: TitleUpgradeBehavior
    }
  },

  upgrade() {
    this.$el.text(this.model.get('title'));
  },

  render() {
    this.upgrade();
  }
});
