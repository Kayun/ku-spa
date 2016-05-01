'use strict';

const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const SellerModel = require('models/Seller');
const App = require('namespace');

module.exports = Backbone.Collection.extend({
  url: '/seller/list',

  model: SellerModel,

  localStorage: new Backbone.LocalStorage('Sellers')

});
