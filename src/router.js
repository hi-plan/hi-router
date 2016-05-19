/**
 * Front End Router by Eric Wong
 * ele828@gmail.com
 * 2016/05/19
 * @flow
 **/

type Mode = 'history' | 'hash' | null;

type Route = {
  regex: string,
  handler: Function
}

// Expose to global env.
export default class Router {
   routes: Array<Route> = [];
   mode: Mode = null;
   root: string = '/';
   intv: number;
   startListen: boolean = false;

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

   // Add a bunch of router
   addList(list: { [key: string]: Function }) {
     const regexs = Object.keys(list);
     regexs.forEach(r => this.add(r, list[r]) );
     return this;
   }

   // Add a router
   add(regex: string, handler: Function) {
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

   remove(param: string | Function) {
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
       let regex = this._clearSlashes(r.regex);
       const match = fragment.match(regex);
       if (match) {
         match.shift();
         r.handler.call(null, match[0])
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
        //  console.log(`old frag: ${curFragment}, new frag: ${this.getFragment()}`)
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
