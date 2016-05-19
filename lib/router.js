
/**
 * Front End Router by Eric Wong
 * ele828@gmail.com
 * 2016/05/19
 *
 **/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Router = factory());
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

  /**
   * Front End Router by Eric Wong
   * ele828@gmail.com
   * 2016/05/19
   * 
   **/

  var Router = function () {
    function Router(options) {
      babelHelpers.classCallCheck(this, Router);
      this.routes = [];
      this.mode = null;
      this.root = '/';
      this.startListen = false;

      options && this.config(options);
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
    }, {
      key: 'add',
      value: function add(regex, handler) {
        this.routes.push({
          regex: regex,
          handler: handler
        });

        // Listen to changes automatically.
        if (!this.startListen) {
          this.listen();
          this.startListen = true;
        }

        return this;
      }
    }, {
      key: 'remove',
      value: function remove(param) {
        var _this = this;

        this.routes.forEach(function (r, i) {
          if (r.handler === param || r.regex.toString() === param.toString()) {
            _this.routes.splice(i, 1);
            return _this;
          }
        });
        return this;
      }

      // Re-initialize

    }, {
      key: 'flush',
      value: function flush() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
      }

      // Fire specific router handler

    }, {
      key: 'fire',
      value: function fire(fragment) {
        var _this2 = this;

        console.log('fire route ' + fragment);
        fragment = fragment || this.getFragment();
        this.routes.forEach(function (r, i) {
          var match = fragment.match(r.regex) || r.regex.match(fragment);
          if (match) {
            console.log('Before shift: ' + match);
            //  match.shift();
            //  console.log(`After shift: ${match}`);
            r.handler.apply(null, match);
            return _this2;
          }
        });
        return this;
      }

      // Listen to fragment changes

    }, {
      key: 'listen',
      value: function listen() {
        var _this3 = this;

        var self = this;
        var curFragment = self.getFragment();
        clearInterval(this.intv);
        this.intv = setInterval(function () {
          // URL changed.
          if (curFragment !== _this3.getFragment()) {
            console.log('old frag: ' + curFragment + ', new frag: ' + _this3.getFragment());
            curFragment = _this3.getFragment();
            // Fire check
            _this3.fire(curFragment);
          }
        }, 50);
        return this;
      }

      // Navigate to specific URL

    }, {
      key: 'navigate',
      value: function navigate(path) {
        path = path || '';
        if (this.mode === 'history') {
          history.pushState(null, '', this.root + this._clearSlashes(path));
        } else {
          window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
      }
    }]);
    return Router;
  }();

  return Router;

}));