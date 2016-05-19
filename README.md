# Hi-Router
A Tiny Front End Router.

## Example
```html
<script src="../lib/router.js"></script>
<script>
var router = new Router();
router.addList({
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

// OR, we can add a route like this.
router.add('/page', function() {
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
router.add('/page', function() {
	console.log('/page route');
});

// Or,we could add a bunch of routes.
router.addList({
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

### Lack of Test Case now
Should not use in Production, it's still an unstable version.
