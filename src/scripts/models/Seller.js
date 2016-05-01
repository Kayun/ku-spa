'use strict';

const Backbone = require('backbone');
const sha1 = require('sha1');
const md5 = require('md5');
const App = require('namespace');
const {unixTimestamp} = require('utils');

module.exports = Backbone.Model.extend({

  initialize() {
    this.set('deviceId', App.Model.User.get('deviceId'));
  },

  urlRoot: '/seller/get_info',

  url() {
    return this.urlRoot;
  },

  signature() {
    const timestamp = unixTimestamp();
    return `${this._sha1(timestamp)}\:${timestamp}`;
  },

  _sha1(timestamp) {
    return sha1(`${this.get('token')}\:${this.get('client_id')}\:${md5(timestamp + 3840)}`);
  }
});
