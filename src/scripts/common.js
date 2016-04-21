'use strict';

const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const utils = require('utils');
Backbone.LocalStorage = require('backbone.localstorage');
Backbone.Wreqr = require('backbone.wreqr');
const App = require('namespace');
const CommonController = require('controllers/Common');
const RouterController = require('controllers/Router');
const Application = require('Application');
require('material-design-lite');

_.extend(App, new Application());

App
  .on('before:start', () => {
    App.setRootLayout();
  })
  .on('start', () => {
    App.root.render();

    const controller = new CommonController();
    controller.router = new RouterController({controller});

    Backbone.history.start();
    controller.start();
  });

localStorage.clear();
console.log(localStorage);

App.start();


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
