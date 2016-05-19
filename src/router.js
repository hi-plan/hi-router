/**
 * Front End Router by Eric Wong
 * ele828@gmail.com
 * 2016/05/19
 *
 * @flow
 **/

type Mode = 'history' | 'hash' | null;

type Route = {
  regex: RegExp,
  handler: Function
}

class Router {
   routes: Array<Route> = [];
   mode: Mode = null;
   root: string = '/';

   constructor(options: Object) {
     options && this.config(options);
   }

   config(options: Object) {
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

   add(regex: RegExp, handler: Function) {
     this.routes.push({
       regex: regex,
       handler: handler
     });
     return this;
   }

   remove(param: RegExp | Function) {
     this.routes.forEach((r, i) => {
       if (r.handler === param || r.regex.toString() === param.toString()) {
         this.routes.splice(i, 1);
         return this;
       }
     });
     return this;
   }

   // Re-initialize
   flush() {
     this.routes = [];
     this.mode = null;
     this.root = '/';
     return this;
   }

 }

// Expose to global env.
export default Router;
