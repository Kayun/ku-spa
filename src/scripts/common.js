const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');

Backbone.LocalStorage = require('backbone.localstorage');


require('material-design-lite');
const namespace = require('namespace');
const utils = require('utils');

const User = require('models/user');

const App = new Marionette.Application();
_.extend(App, namespace);

const user = new User();

// user.save({salt: 'test'});
user.fetch({
  success(data, res) {
  }
});

$(() => {
  const $header = $('.js-header');
  const $content = $('.js-content');
  const $logo = $('.js-logo');
  let positionFlag = 'bottom';
  const originColor = $logo.css('background-color');
  const newColor = '#eb2d2d';
  $(document).on('click', 'a', utils.link);

  $content.scroll(() => {
    const headerBottom = $header.get(0).getBoundingClientRect().bottom;
    const logoBottom = $logo.get(0).getBoundingClientRect().bottom;
    const logoTop = $logo.get(0).getBoundingClientRect().top;

    console.log(headerBottom);
    console.log(logoTop);

    if (headerBottom > logoBottom) {
      $header.css('background-color', newColor);
      $logo.css('background-color', newColor);
      positionFlag = 'top';
    } else if (headerBottom === logoTop) {
      $header.css('background-color', originColor);
      $logo.css('background-color', originColor);
      positionFlag = 'bottom';
    }
  });
});
