describe('Router Initialize Test', function() {

	it('should be Initialized properly', function() {
		var router = null
		router = new Router
		expect(router).not.toBe(null)
  })

	it('should be configured by constructor', function() {
		var config = {
			mode: 'history',
			root: '/dir/'
		}
		var router = new Router(config)
		expect({
			mode: router.mode,
			root: router.root}
		).toEqual(config);
	})

});

describe('Router Configuration Test', function() {

	it('should be configured by constructor', function() {
		var config = {
			mode: 'history',
			root: '/dir/'
		}
		var router = new Router()
		router.config(config)
		expect({
			mode: router.mode,
			root: router.root}
		).toEqual(config);
	})

	it('should throw exception if params is empty or null', function() {
		var router = new Router()

	})

})
