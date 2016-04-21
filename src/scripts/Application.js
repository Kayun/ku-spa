const Marionette = require('backbone.marionette');
const DefaultLayout = require('layouts/Default');

module.exports = Marionette.Application.extend({
  setRootLayout() {
    this.root = new DefaultLayout();
  }
});
