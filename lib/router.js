(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers;

  var Router = function () {
    function Router(options) {
      babelHelpers.classCallCheck(this, Router);

      this.config(options);
    }

    babelHelpers.createClass(Router, [{
      key: 'config',
      value: function config(options) {
        if (!options) throw new Error('Params should be an Object and should not be empty.');

        this.mode = options.mode;
        this.mode = options.mode && options.mode == 'history' && !!history.pushState ? 'history' : 'hash';

        this.root = options.root ? '/' + this._clearSlashes(options.root) + '/' : '/';
        return this;
      }
    }, {
      key: 'getFragment',
      value: function getFragment() {
        var fragment = void 0;
        if (this.mode === 'history') {
          var path = decodeURI(location.pathname);
          fragment = this._clearSlashes(path);
          fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
          var match = location.href.match(/#(.*)$/);
          fragment = match ? match[1] : '';
        }
        return this._clearSlashes(fragment);
      }
    }, {
      key: '_clearSlashes',
      value: function _clearSlashes(path) {
        return path.replace(/\/$/, '').replace(/^\//, '');
      }
    }]);
    return Router;
  }();

}));