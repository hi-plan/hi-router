describe('Use Case Testing', function() {
  it('should be called in chain', function() {
      var fired = false,
          aboutMeFired = false;
      var router = new Router

      router.config({
        mode:'hash',
        root: '/'
      })
      .dispatch(
        '/about',
        function() {
          fired = true
        })
      .dispatchAll({
        '/about/me': function() { aboutMeFired = true; }
      })
      .fire('/about')
      .fire('/about/me')

      expect(fired).toBe(true)
      expect(aboutMeFired).toBe(true)
  })

  it('should perform properly', function(done) {
    var router = new Router
    var aboutBeCalled = false,
        meBeCalled = false,
        regExpBeCalled = false

    router.config({
      mode:'hash',
      root: '/'
    }).dispatchAll({
      '/about': function() {
        aboutBeCalled = true
      },
      '/about/me': function() {
        meBeCalled = true
      },
      '/about/(.*)?': function() {
        regExpBeCalled = true
      }
    })

    router.navigate('/about')
    setTimeout(function() {
      if (aboutBeCalled)
        done()
      else done.fail()
    }, 70)
  })

  it('should support regular expression properly', function() {
    var router = new Router
    var aboutBeCalled = false,
        meBeCalled = false,
        regExpBeCalled = false,
        retval = -1,
        retId = -1,
        retName = ''

    router.config({
      mode:'hash',
      root: '/'
    })
    .dispatchAll({
      '/about': function() {
        aboutBeCalled = true
      },
      '/about/me': function() {
        meBeCalled = true
      },
      '/about/(.*)?': function(id) {
        regExpBeCalled = true
        retval = id
      },
      '/aboutme/(.*)?/(.*)?': function(id, name) {
        retId = id;
        retName = name;
      }
    })
    .fire('/about')
    .fire('/about/me')
    .fire('/about/123')
    .fire('/aboutme/11/eric')

    expect(aboutBeCalled).toBe(true)
    expect(meBeCalled).toBe(true)
    expect(regExpBeCalled).toBe(true)
    expect(retval).toBe('123')
    expect(retId).toBe('11')
    expect(retName).toBe('eric')

  })
})
