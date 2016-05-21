module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
			'lib/router.js',
      'test/*.js'
    ],
		singleRun: true,
		browsers: ['PhantomJS'],
		reporters: ['progress']
  });
};
