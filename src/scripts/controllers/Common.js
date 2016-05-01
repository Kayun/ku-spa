'use strict';

const $ = require('jquery');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const RegisterController = require('controllers/Register');
const ProfileController = require('controllers/Profile');
const App = require('namespace');
const UserModel = require('models/User');
const HeaderModel = require('models/Header');
const HeaderView = require('views/Header');
const SpinnerView = require('views/Spinner');
const SellersCollection = require('collections/Sellers');

module.exports = Marionette.Object.extend({

  globalChanel: Backbone.Wreqr.radio.channel('global'),

  initialize() {

    this.models = {
      header: new HeaderModel()
    };

    this.collections = {
      sellers: new SellersCollection()
    };

    this.collections.sellers.fetch();
    console.log(this.collections.sellers);

    this.subcontrollers = {};

    this.globalChanel.reqres.setHandler('navigate:back', this.back);
    this.globalChanel.vent.on('content:load', $.proxy(App.root, 'displayShow', 300));
  },

  start() {
    App.root.showChildView('header', new HeaderView({model: this.models.header}));
    App.root.showChildView('spinner', new SpinnerView());

    if (UserModel.isInit()) {
      App.Model.User = new UserModel({id: UserModel.remoteId()});
      App.Model.User.fetch();
      this.index();
      console.log(App.Model.User);
    } else {
      Backbone.history.navigate('register', {trigger: true});
    }
  },

  back() {
    App.root.direction = 'left';
    window.history.back();
  },

  register(method) {
    if (!this.subcontrollers.register) {
      delete this.subcontrollers.profile;
      this.subcontrollers.register = new RegisterController();
    }

    App.root.getRegion('content').$el.removeClass('content_display_block');
    this.models.header.set('title', 'Ку! Мобильные привилегии');
    if (method) {
      this.subcontrollers.register[method]();
    } else {
      this.subcontrollers.register.index();
    }
  },

  profile() {

    if (!this.subcontrollers.profile) {
      delete this.subcontrollers.register;
      this.subcontrollers.profile = new ProfileController();
    }

    App.root.displayToggle(() => {
      this.models.header.set('title', 'Профиль');
      this.subcontrollers.profile.index();
      App.root.getRegion('content').$el.addClass('content_display_block');
    });
  },

  index() {
    delete this.subcontrollers.profile;
    delete this.subcontrollers.register;

    const sellerCount = this.collections.sellers.length;

    switch (sellerCount) {
    case 0:
      Backbone.history.navigate('register/seller', {trigger: true});
      break;
    case 1:
      break;
    default:
      break;
    }
  }
});
