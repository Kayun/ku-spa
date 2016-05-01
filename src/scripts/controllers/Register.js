'use strict';

const $ = require('jquery');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const App = require('namespace');
const {parseData} = require('utils');
const User = require('models/User');
const RegisterLayout = require('layouts/Register');
const RegisterTitleModel = require('models/RegisterTitle');
const RegisterTitleView = require('views/RegisterTitle');
const RegisterMethodSelectView = require('views/RegisterMethodSelect');
const RegisterEnterEmailView = require('views/RegisterEnterEmail');
const RegisterEnterInviteView = require('views/RegisterEnterInvite');

module.exports = Marionette.Object.extend({

  initialize() {

    App.Model.User = new User();

    this.models = {
      title: new RegisterTitleModel()
    };

    this.views = {
      title: new RegisterTitleView({model: this.models.title}),
      Index: RegisterMethodSelectView,
      Email: RegisterEnterEmailView,
      Invite: RegisterEnterInviteView
    };

    this.layout = new RegisterLayout();

    this.layout.on('before:show', () => {
      this.layout.showChildView('title', this.views.title);
    });

    App.root.getRegion('content').show(this.layout);

    this.channel.vent
      .on('auth:social', type => {
        App.Model.User[`${type}Auth`]();
      })
      .on('auth:email', $.proxy(this, '_emailMethod'))
      .on('seller:register', $.proxy(this, '_emailMethod'));
  },

  channel: Backbone.Wreqr.radio.channel('register'),

  _emailMethod(email) {
    App.Model.User.registerEmail(email).then(this._registerCallback);
  },

  _registerCallback(res) {
    console.log(res);
    const {already_exist: isAlreadyExist, user} = parseData(res).data;

    if (isAlreadyExist) {
      App.Model.User.restore();
    } else {
      App.Model.User.set(user);
      App.Model.User.save();
      console.log(App.Model.User);

      Backbone.history.navigate('profile', {trigger: true});
    }
  },

  index() {
    App.root.displayToggle(() => {
      this.models.title.set('title', 'Выберите способ входа');
      this.layout.showChildView('content', new this.views.Index());
    });
  },

  email() {
    App.root.displayToggle(() => {
      this.models.title.set('title', 'Введите Ваш адрес электронной почты');
      this.layout.showChildView('content', new this.views.Email());
    });
  },

  seller() {
    console.log('seller');
    App.root.displayToggle(() => {
      this.models.title.set('title', 'Введите номер приглашения для добавления нового магазина');
      this.layout.showChildView('content', new this.views.Invite());
    });
  }
});
