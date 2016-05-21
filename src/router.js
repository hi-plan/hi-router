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
     if (
        // null | '' | undefined
        !options
        // case: {} is not allowed.
        || Object.keys(options).length === 0
        || JSON.stringify(options) === '{}'
      )
       throw new Error('Params should be an Object and should not be empty.')

     this.mode = options.mode
     this.mode = options.mode && options.mode == 'history' && !!(history.pushState)
                    ? 'history'
                    : 'hash';

     // If pass in root: '/', ignore it.
     if (options.root && options.root === '/')
       return this;

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

   // Add a router
   dispatch(regex: string, handler: Function) {
     // Validation Judgement
     if (!regex || !handler)
       throw new Error('Bad arguments pass to dispatch().')

     if (this._contains(this.routes, {regex: regex, handler: handler}))
       throw new Error('Add route twice.')

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
   dispatchAll(list: { [key: string]: Function }) {
     let regexs = null;
     try {
       regexs = Object.keys(list)
       if (regexs.length === 0)
        throw new Error('Object should not be empty.');
     } catch(e) {
       throw new Error('Bad arguments pass to dispathAll().')
     }

     regexs.forEach(r => this.dispatch(r, list[r]) );
     return this;
   }

   remove(param: string | Function) {
     const r = this.routes;
     for (let i = 0; i < r.length; i++) {
       if (param === r[i].handler) {
         r.splice(i, 1)
         i--;
       } else if (r[i].regex.toString() === param.toString()) {
         r.splice(i, 1);
         return this;
       }
     }

     return this;
   }

   _contains(arr: Array<any>, target: any): boolean {
     let i = arr.length;
     while(i--) {
       if (target.regex === arr[i].regex)
        return true
     }
     return false
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
       if (path.indexOf('#') >= 0)
        return;
       history.pushState(null, '', this.root + this._clearSlashes(path))
     }
     else {
       window.location.href = window.location.href.replace(/#(.*)$/, '')
                              + '#/' + this._clearSlashes(path);
     }
     return this;
   }

 }
