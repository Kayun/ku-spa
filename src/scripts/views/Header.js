'use strict';

const Marionette = require('backbone.marionette');
const NavigateBackBehavior = require('behaviors/NavigateBack');
const TitleUpgradeBehavior = require('behaviors/TitleUpgrade');

module.exports = Marionette.ItemView.extend({
  template: require('templates/view-header.jade'),

  ui: {
    back: '.js-back',
    title: '.js-title'
  },

  behaviors: {
    navigateBack: {
      behaviorClass: NavigateBackBehavior
    },
    titleUpgrade: {
      behaviorClass: TitleUpgradeBehavior
    }
  },

  backTriggerShow() {
    console.log(this.ui.back);
  }
});

