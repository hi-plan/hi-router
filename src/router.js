/**
 * Front End Router by Eric Wong
 * ele828@gmail.com
 * 2016/05/19
 *
 * @flow
 **/

import Pattern from './pattern.js';

type Mode = 'history' | 'hash';

class Router {
   routes: Array<Pattern>;
   mode: Mode;
   root: string;

   constructor(options) {
     this.config(options);
   }

   config(options) {
     if (!options)
       throw new Error('Params should be an Object and should not be empty.')

     this.mode = options.mode
     this.mode = options.mode && options.mode == 'history' && !!(history.pushState)
                    ? 'history'
                    : 'hash';

     this.root = options.root
                    ? '/' + this._clearSlashes(options.root) + '/'
                    : '/';
     return this;
   }

   getFragment() {
     let fragment: string;
     if (this.mode === 'history') {
       const path = decodeURI(location.pathname);
       fragment = this._clearSlashes(path);
       fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
     }
     else {
       const match = location.href.match(/#(.*)$/);
       fragment = match? match[1]: '';
     }
     return this._clearSlashes(fragment)
   }

   _clearSlashes(path: string): string {
     return path
          .replace(/\/$/, '')
          .replace(/^\//, '');
   }

 }
