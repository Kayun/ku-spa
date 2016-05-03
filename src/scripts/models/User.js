'use strict';

const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const sha1 = require('sha1');
const {unixTimestamp, guid} = require('utils');
const {SALT: salt, API_KEY: apiKey} = require('access.json');

const User = Backbone.Model.extend(
  {
    salt,

    apiKey,

    vkId: '5428277',

    service: 'http://loyalty2.virtualpos.ru/apimobile',
    registerApiMethod: '/user/register',
    setProfileApiMethod: '/user/set_info',
    getProfileApiMethod: '/user/get_info',
    urlRoot: '/user',

    initialize(options) {
      if (!options || !options.id) this.set('deviceId', guid());
    },

    localStorage: new Backbone.LocalStorage('User'),

    _sha1(key, timestamp, userId = '') {
      return sha1(`${key}\:${timestamp}\:${this.salt}\:${userId}`);
    },

    sign() {
      const timestamp = unixTimestamp();
      return `${this._sha1(this.apiKey, timestamp)}\:${timestamp}`;
    },

    auth() {
      const timestamp = unixTimestamp();
      return `${this._sha1(this.get('private_key'), timestamp, this.id)}\:${timestamp}`;
    },

    vkAuth() {
      const authURL = 'https://oauth.vk.com/authorize?client_id=5428277&redirect_uri=http://oauth.vk.com/blank.html&display=mobile&response_type=token';
      const frame = window.open(authURL, '_blank', 'location=no');

      // TODO: переписать для PhoneGap с использованием

      console.dir(frame.location.href);
      $(frame).on('loadend', function () {
        console.log(this.location.href);
      }, false);
    },

    vkAuthIframeCallback(event) {

      console.log(event);
    },

    register(method, token) {

      return $.ajax({
        url: `${this.service}${this.registerApiMethod}`,
        data: {
          token_type: method,
          token_to_register: token,
          deviceid: this.get('deviceId'),
          sign: this.sign()
        }
      });
    },

    setProfile(data) {
      return $.ajax({
        url: `${this.service}${this.setProfileApiMethod}?${data}`,
        data: this._authData()
      });
    },

    getProfile() {
      return $.ajax({
        url: `${this.service}${this.getProfileApiMethod}`,
        data: this._authData()
      });
    },

    _authData() {
      return {
        deviceid: this.get('deviceId'),
        sign: this.sign(),
        auth: this.auth(),
        uid: this.id
      };
    },

    restore() {
      console.log('restore');
    },

    registerEmail(email) {
      return this.register('email', email);
    },

    registerSocial(method) {
      return this.register(method, '');
    }
  },

  {
    isInit() {
      return !!localStorage.getItem('User');
    },

    remoteId() {
      return localStorage.getItem('User');
    }
  }
);

module.exports = User;
