/**
 * Front End Router by Eric Wong
 * ele828@gmail.com
 * 2016/05/19
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
   intv: number;
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

   getFragment(): string {
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

   // Fire specific router handler
   fire(fragment: string) {
     fragment = fragment || this.getFragment();
     this.routes.forEach((r: Route, i) => {
       const match = fragment.match(r.regex);
       if (match) {
         console.log(`Before shift: ${match}`);
        //  match.shift();
        //  console.log(`After shift: ${match}`);
         r.handler.apply(null, match)
         return this;
       }
     });
     return this;
   }

   // Listen to fragment changes
   listen() {
     let curFragment = this.getFragment();
     clearInterval(this.intv);
     this.intv = setInterval(() => {
       // URL changed.
       if (curFragment !== this.getFragment()) {
         curFragment = this.getFragment();
         // Fire check
         this.fire(curFragment);
       }
     }, 50);
     return this;
   }

   // Navigate to specific URL
   navigate(path: string) {
     path = path || '';
     if (this.mode === 'history') {
       history.pushState(null, '', this.root + this._clearSlashes(path))
     }
     else {
       window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
     }
     return this;
   }

 }

// Expose to global env.
export default Router;
