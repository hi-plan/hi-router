module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
			'lib/router.js',
      'test/*.js'
    ],
		singleRun: true,
		browsers: ['PhantomJS'],
		reporters: ['spec', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary', dir: 'coverage/', subdir: '.' }
      ]
    }
  });
};
