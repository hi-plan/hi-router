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
router.navigate('/about/123');
