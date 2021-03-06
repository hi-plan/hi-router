<a href="https://circleci.com/gh/hi-plan/hi-router/tree/master"><img src="https://img.shields.io/circleci/project/hi-plan/hi-router/master.svg" alt="Build Status"></a>
<a href="https://codecov.io/github/hi-plan/hi-router?branch=master"><img src="https://img.shields.io/codecov/c/github/hi-plan/hi-router/master.svg" alt="Coverage Status"></a>

# Hi-Router
A Tiny Front End Router.

## Example
```html
<script src="../lib/router.js"></script>
<script>
	var router = new Router();
	router.on({
	  '/author': function() {
		  console.log('/author route');
	  },

	  '/about/(.*)?': function(id) {
	    console.log('/about route, id:', id);
	  },

	  '/aboutme/(.*)?/(.*)?': function(id, name) {
	    var retId = id;
	    var retName = name;
    }
	});

	router.go('/');
	router.go('/author');
	router.go('/about');

	// OR, we can add a route like this.
	router.on('/page', function() {
		console.log('/page route');
	});
</script>
```

## API Reference
- Import
It's exported by UMD. We could use it by AMD, Common JS require, or directly
import through ```<script>``` tag in the browser environment.

- Router Initialize
After imported, we could initialize it like:

```javascript
var router = new Router({
	mode: 'history',  // 'history' or 'hash'
	root: '/'  // by default
});

// We could also init in this way.
var router = new Router();
router.config({
	mode: 'history',  // 'history' or 'hash'
	root: '/'  // by default
});
```

- Use it

```javascript
router.on('/page', function() {
	console.log('/page route');
});

// Or,we could dispatch a bunch of routes.
router.on({
	'/author': function() {
		console.log('/author route');
	},

	'/about/(.*)?': function(id) {
		console.log('/about route, id:', id);
	}
});
```

go to specified path.
```javascript
router.go('/author');
```

- Re-initialize

```javascript
router.flush();
```

## Development

```npm install```

```npm run build```
