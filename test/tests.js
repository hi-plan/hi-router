var router = new Router();
router.addList({
	'/author': function() {
		console.log('/author route');
	},

	'/about': function() {
		console.log('/about route');
	}
});

router.navigate('/');
router.navigate('/author');
router.navigate('/about');
