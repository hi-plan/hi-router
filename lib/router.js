
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

  // Expose to global env.
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
        if (
        // null | '' | undefined
        !options
        // case: {} is not allowed.
         || Object.keys(options).length === 0 || JSON.stringify(options) === '{}') throw new Error('Params should be an Object and should not be empty.');

        this.mode = options.mode;
        this.mode = options.mode && options.mode == 'history' && !!history.pushState ? 'history' : 'hash';

        // If pass in root: '/', ignore it.
        if (options.root && options.root === '/') return this;

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

      // Add a router

    }, {
      key: 'dispatch',
      value: function dispatch(regex, handler) {
        // Validation Judgement
        if (!regex || !handler) throw new Error('Bad arguments pass to dispatch().');

        if (this._contains(this.routes, { regex: regex, handler: handler })) throw new Error('Add route twice.');

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

      // Add a bunch of router

    }, {
      key: 'dispatchAll',
      value: function dispatchAll(list) {
        var _this = this;

        var regexs = null;
        try {
          regexs = Object.keys(list);
          if (regexs.length === 0) throw new Error('Object should not be empty.');
        } catch (e) {
          throw new Error('Bad arguments pass to dispathAll().');
        }

        regexs.forEach(function (r) {
          return _this.dispatch(r, list[r]);
        });
        return this;
      }
    }, {
      key: 'remove',
      value: function remove(param) {
        var r = this.routes;
        for (var i = 0; i < r.length; i++) {
          if (param === r[i].handler) {
            r.splice(i, 1);
            i--;
          } else if (r[i].regex.toString() === param.toString()) {
            r.splice(i, 1);
            return this;
          }
        }

        return this;
      }
    }, {
      key: '_contains',
      value: function _contains(arr, target) {
        var i = arr.length;
        while (i--) {
          if (target.regex === arr[i].regex) return true;
        }
        return false;
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

        fragment = fragment || this.getFragment();
        this.routes.forEach(function (r, i) {
          var regex = _this2._clearSlashes(r.regex);
          var match = fragment.match(regex);
          if (match) {
            match.shift();
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

        var curFragment = this.getFragment();
        clearInterval(this.intv);
        this.intv = setInterval(function () {
          // URL changed.
          if (curFragment !== _this3.getFragment()) {
            //  console.log(`old frag: ${curFragment}, new frag: ${this.getFragment()}`)
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
          if (path.indexOf('#') >= 0) return;
          history.pushState(null, '', this.root + this._clearSlashes(path));
        } else {
          window.location.href = window.location.href.replace(/#(.*)$/, '') + '#/' + this._clearSlashes(path);
        }
        return this;
      }
    }]);
    return Router;
  }();

  return Router;

}));