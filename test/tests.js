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
      root: router.root
    }).toEqual(config);
  })

  it('should not be called as function', function() {
    var err = 'Cannot call a class as a function'
    expect(Router).toThrowError(err)
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

    expect(router.config).toThrowError(errMsg)
    expect(router.config.bind(router, '')).toThrowError(errMsg)
    expect(router.config.bind(router, {})).toThrowError(errMsg)
    expect(router.config.bind(router, null)).toThrowError(errMsg)

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


describe('getFragment Method Test', function() {
  it('should get URL fragment correctly in `hash` mode', function() {
    var router = new Router({
      mode: 'hash'
    })
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
    var router = new Router({
      mode: 'history'
    })
    router.navigate('/about')
    expect(router.getFragment()).toBe('about')

    router.navigate('/about/')
    expect(router.getFragment()).toBe('about')

    router.navigate('/about/test/')
    expect(router.getFragment()).toBe('about/test')

    router.navigate('/#/about/test/')
      // Contains hash tag will fail to jump!
    expect(router.getFragment()).toBe('about/test')
  })

})

describe('dispatch Method Test', function() {
  it('should handle normal arguments scenario', function() {
    var router = new Router
    var handler = function() {}
    router.dispatch('/about', handler)
    router.dispatch('/homepage', handler)

    expect(router.routes.length).toBe(2)
    expect(router.routes[0]).toEqual({
      regex: '/about',
      handler: handler
    })
    expect(router.routes[1]).toEqual({
      regex: '/homepage',
      handler: handler
    })
  })

  it('should handle bad arguments scenario', function() {
    var router = new Router
    var handler = function() {}

    var errMsg = 'Bad arguments pass to dispatch().'

    expect(router.dispatch.bind(router, '/test', null)).toThrowError(errMsg)
    expect(router.dispatch.bind(router, handler)).toThrowError(errMsg)
  })
})

describe('dispatchAll Method Test', function() {
  it('should handle normal arguments scenario', function() {
    var router = new Router
    var handler = function() {}
    router.dispatchAll({
      '/about': handler,
      '/homepage': handler
    })

    expect(router.routes.length).toBe(2)
    expect(router.routes[0]).toEqual({
      regex: '/about',
      handler: handler
    })
    expect(router.routes[1]).toEqual({
      regex: '/homepage',
      handler: handler
    })
  })

  it('should handle bad arguments scenario', function() {
    var router = new Router
    var handler = function() {}

    var errMsg = 'Bad arguments pass to dispathAll().'
    expect(router.dispatchAll.bind(router, null)).toThrowError(errMsg)
    expect(router.dispatchAll.bind(router, undefined)).toThrowError(errMsg)
    expect(router.dispatchAll.bind(router, {})).toThrowError(errMsg)
  })
})
