<a href="https://circleci.com/gh/hi-plan/hi-router/tree/master"><img src="https://img.shields.io/circleci/project/hi-plan/hi-router/master.svg" alt="Build Status"></a>
<a href="https://codecov.io/github/hi-plan/hi-router?branch=master"><img src="https://img.shields.io/codecov/c/github/hi-plan/hi-router/master.svg" alt="Coverage Status"></a>

# Hi-Router
A Tiny Front End Router.

## Example
```html
<script src="../lib/router.js"></script>
<script>
	var router = new Router();
	router.dispatchAll({
		'/author': function() {
			console.log('/author route');
		},

		'/about/(.*)?': function(id) {
			console.log('/about route, id:', id);
		}
	});

	router.navigate('/');
	router.navigate('/author');
	router.navigate('/about');

	// OR, we can dispatch a route like this.
	router.dispatch('/page', function() {
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
router.dispatch('/page', function() {
	console.log('/page route');
});

// Or,we could dispatch a bunch of routes.
router.dispatchAll({
	'/author': function() {
		console.log('/author route');
	},

	'/about/(.*)?': function(id) {
		console.log('/about route, id:', id);
	}
});
```

Navigate to specified path.
```javascript
router.navigate('/author');
```

- Re-initialize

```javascript
router.flush();
```

## Development

```npm install```

```npm run build```

### Lack of Test Case now
Should not use in Production, it's still an unstable version.
