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
      Profile: ProfileView
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
      getData(this._saveData);
    });
  },

  _saveData(data) {
    const {data: {user}, success} = parseData(data);

    if (success) {
      App.Model.User.set(user);
      App.Model.User.save({
        success(model) {
          console.log(model);
        }
      });
      Backbone.history.navigate('/', {trigger: true});
    } else {
      // error
    }
  },

  index() {
    App.root.showChildView('content', new this.view.Profile());
  }

});
