'use strict';

const Marionette = require('backbone.marionette');

module.exports = Marionette.Behavior.extend({

  modelEvents: {
    change: 'titleUpgrade'
  },

  titleUpgrade() {
    const title = this.ui.title || this.$el;
    title.text(this.view.model.get('title'));
  }
});
