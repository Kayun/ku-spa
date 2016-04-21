'use strict';

const DataFetchError = require('errors/dataFetchError');
const $ = require('jquery');

module.exports = {
  link(event, router) {

    const href = $(this).attr('href');

    if (!href) return false;
    if (href === 'javascript:void(0)' || href === '#') return false;
    if (~href.indexOf('mailto') || ~href.indexOf('tel')) return true;

    if (event) event.preventDefault();

    if (router) {
      router.navigate(href, {trigger: true});
    } else {
      Backbone.history.navigate(href, {trigger: true});
    }

  },

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  },

  parseData(resp, options) {
    let parseData = {};
    try {
      parseData = $.extend(true, parseData, JSON.parse(resp));
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new DataFetchError('Синтаксическая ошибка в полученных данных', error);
      } else {
        throw error;
      }
    }

    return parseData;
  },

  unixTimestamp() {
    return Math.round(new Date().getTime() / 1000);
  }
};
