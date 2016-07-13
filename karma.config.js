module.exports = function (config) {
	config.set({
		frameworks: [
			'browserify',
			'jasmine'
		],
		preprocessors: {
			'**/*.ts': ['browserify']
		},
		files: [
			// 'node_modules/angular/angular.js',
			// 'node_modules/angular-mocks/angular-mocks.js',
			// 'node_modules/angular-ui-router/release/angular-ui-router.js',
			'src/*.spec.ts'
		],
		reporters: ['spec'],
		browserify: {
			debug: true,
			extensions: ['.js', '.ts'],
			transform: [
				['babelify', {presets: ['es2015', 'stage-0'],  extensions: ['.ts', '.js']}]
			],
			plugin: ['tsify']
		},
		plugins: [
			'karma-browserify',
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-spec-reporter'
		],
		logLevel: config.LOG_INFO,
		browsers: [
			'PhantomJS'
		]
	});
};
