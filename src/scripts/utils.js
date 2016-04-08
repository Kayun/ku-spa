'use strict';

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

  }
};
