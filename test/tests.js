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
		var router = new Router(config)
		expect({
			mode: router.mode,
			root: router.root
		}).toEqual(config)
	})

	it('should be configured properly by config()', function() {
		var config = {
			mode: 'history',
			root: '/dir/'
		}
		var router = new Router()
		router.config(config)
		expect({
			mode: router.mode,
			root: router.root
		}).toEqual(config)
	})

	it('should throw exception if params is empty or null', function() {
		var errMsg = 'Params should be an Object and should not be empty.'
		var router = new Router()

		var emptyConfig = function() {
			try {
				router.config()
			} catch(e) {
				throw e
			}
		}

		var nullConfig = function() {
			try {
				router.config(null)
			} catch(e) {
				throw e
			}
		}

		var emptyObjConfig = function() {
			try {
				router.config({})
			} catch(e) {
				throw e
			}
		}

		var nullParamsConfig = function() {
			try {
				router.config(null)
			} catch(e) {
				throw e
			}
		}

		expect(emptyConfig).toThrowError(errMsg)
		expect(nullConfig).toThrowError(errMsg)
		expect(emptyObjConfig).toThrowError(errMsg)
		expect(nullParamsConfig).toThrowError(errMsg)

	})

	it('should set to `hash` if `mode` is undefined', function() {
		var config = {
			root: '/dir'
		}
		var router = new Router()
		router.config(config)
		expect(router.mode).toBe('hash')

		// Will add two slash `/xxx/`` automatically
		expect(router.root).toBe('/dir/')

		config = {
			root: '/dir/'
		}
		router.config(config)
		expect(router.root).toBe('/dir/')
	})

	it('should work if root is undefined', function() {
		var config = {
			mode: 'history'
		}
		var router = new Router()
		router.config(config)
		expect(router.mode).toBe('history')
		expect(router.root).toBe('/')
	})
})

describe('Navigate Function Test in `hash` Mode', function() {

	var router = new Router()
	router.config({
		mode: 'hash'
	})

	var sourceURL = location.href

	// Reset URL to root.
	beforeEach(function() {
		location.href = sourceURL
	})

	it('should navigate to correct URL', function() {
		var url = location.href
		router.navigate('/about')
		expect(location.href).toBe(url + '#/about')

		router.navigate('/about/')
		expect(location.href).toBe(url + '#/about')
	})

	it('should navigate to correct URL in complex path', function() {
		router.navigate('/about')
		expect(location.href).toBe(sourceURL + '#/about')

		router.navigate('/about/test')
		expect(location.href).toBe(sourceURL + '#/about/test')

		router.navigate('/about/test/')
		expect(location.href).toBe(sourceURL + '#/about/test')
	})

})

describe('Navigate Function Test in `history` Mode', function() {
	var router = new Router()
	router.config({
		mode: 'history'
	})

	var sourceURL = 'http://' + location.host;

	// Reset URL to root.
	beforeEach(function() {
		location.href = sourceURL
	})

	it('should navigate to correct URL', function() {
		router.navigate('/about')
		expect(location.href).toBe(sourceURL + '/about')

		router.navigate('/about/')
		expect(location.href).toBe(sourceURL + '/about')
	})

	it('should navigate to correct URL in complex path', function() {
		router.navigate('/about')
		expect(location.href).toBe(sourceURL + '/about')

		router.navigate('/about/test')
		expect(location.href).toBe(sourceURL + '/about/test')

		router.navigate('/about/test/')
		expect(location.href).toBe(sourceURL + '/about/test')
	})

})


describe('GetFragment Method Test', function() {

	it('should get URL fragment correctly in `hash` mode', function() {
		var router = new Router({mode: 'hash'})
		expect(router.getFragment()).toBe('')

		router.navigate('/about')
		expect(router.getFragment()).toBe('about')

		router.navigate('/about/')
		expect(router.getFragment()).toBe('about')

		router.navigate('/about/test/')
		expect(router.getFragment()).toBe('about/test')

		router.navigate('#/about/test/')
		expect(router.getFragment()).toBe('#/about/test')
	})

	it('should get URL fragment correctly in `history` mode', function() {
		var router = new Router({mode: 'history'})
		router.navigate('/about')
		expect(router.getFragment()).toBe('about')

		router.navigate('/about/')
		expect(router.getFragment()).toBe('about')

		router.navigate('/about/test/')
		expect(router.getFragment()).toBe('about/test')

		router.navigate('#/about/test/')
		console.log(location.href)
		// Contains hash tag will fail to jump!
		expect(router.getFragment()).toBe('about/test')
	})
})

describe('Add Method Test', function() {
	it('should add() handle bad arguments', function() {
		var router = new Router()
		router.add()
	})
})
