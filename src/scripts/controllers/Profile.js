'use strict';

const $ = require('jquery');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const App = require('namespace');
const {parseData} = require('utils');
const ProfileView = require('views/Profile');

module.exports = Marionette.Object.extend({

  initialize() {
    this.view = {
      profile: new ProfileView()
    };

    this.globalChanel.vent.on('profile:send', $.proxy(this, 'send'));
  },

  globalChanel: Backbone.Wreqr.radio.channel('global'),

  send() {

    const data = this.view.profile.$el.serialize();

    const getData = callback => {
      App.Model.User.getProfile().then(callback);
    };

    App.Model.User.setProfile(data).then(() => {
      getData($.proxy(this, '_saveData'));
    });
  },

  _saveData(data) {
    const {data: {user}, success} = parseData(data);
    const that = this;

    if (success) {
      App.Model.User.set(user);

      App.Model.User.save(user, {
        success() {
          that.globalChanel.vent.trigger('content:select');
        }
      });
    } else {
      // error
    }
  },

  index() {
    if (!this.view.profile) {
      this.view.profile = new ProfileView();
    }

    App.root.showChildView('content', this.view.profile);
  }

});
