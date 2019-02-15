import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

export const on = (function () {
  if (!isServer) {
    return function (element, event, handler) {
      if (element && event && handler) {
        if (document.addEventListener) {
          element.addEventListener(event, handler, false);
        } else {
          element.attachEvent('on' + event, handler);
        }
      }
    };
  }
})();
