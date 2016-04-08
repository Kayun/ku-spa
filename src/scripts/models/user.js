const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const sha1 = require('sha1');


module.exports = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage('User')
});
