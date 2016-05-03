'use strict';

const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const SellerModel = require('models/Seller');
const App = require('namespace');
const {parseData} = require('utils');

module.exports = Backbone.Collection.extend({

  service: 'http://loyalty2.virtualpos.ru/apimobile',

  addSellerApiMethod: '/invite/activate',

  getSellersApiMethod: '/seller/list',

  url() {
    return this.service + this.getSellersApiMethod;
  },

  model: SellerModel,

  localStorage: new Backbone.LocalStorage('Sellers'),

  addSeller(inviteCode) {
    return $.ajax({
      url: this.service + this.addSellerApiMethod,
      data: $.extend({}, App.Model.User._authData(), {
        code: inviteCode
      })
    });
  },

  upgrade() {
    const deff = $.Deferred();

    $.ajax({
      url: this.service + this.getSellersApiMethod,
      data: App.Model.User._authData()
    }).then(data => {
      this._upgrade(data);
      deff.resolve();
    });

    return deff.promise();
  },

  _upgrade(data) {
    const {data: {sellers}} = parseData(data);
    const newSellers = _.map(sellers, item => {
      return new this.model(item);
    });

    this.set(newSellers);
    _.each(this.models, item => {
      item.id = item.get('id');
    });
    console.log(this);
  }

});
