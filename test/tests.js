const assert = require('chai').assert;

const Router = require('../lib/router')

global.history = {}
global.history.pushState = () => {};

describe('Router Initialize Test', () => {

	it('should be Initialized properly', () => {
		let router = null
		router = new Router
		assert.isNotNull(!router, "Router is not null")
  })

	it('should be configured by constructor', () => {
		const config = {
			mode: 'history',
			root: '/dir/'
		}
		let router = new Router(config)
		assert.deepEqual({
			mode: router.mode,
			root: router.root
		}, config)
	})

});

describe('Router Configuration Test', () => {

	it('should be configured by constructor', () => {
		const config = {
			mode: 'history',
			root: '/dir/'
		}
		let router = new Router()
		router.config(config)
		assert.deepEqual({
			mode: router.mode,
			root: router.root
		}, config)
	})

	it('should throw exception if params is empty or null', () => {
		let router = new Router()
		assert.throws(router.config)
	})

})
