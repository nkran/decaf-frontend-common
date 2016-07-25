import core from './core';


// TODO: implement unit tests for this module
describe('utils', () => {
	describe('platformProvider', () => {
		let provider;

		beforeEach(angular.mock.module('test.core', ['platformProvider', (platformProvider) => {
			provider = platformProvider;
		}]));

		beforeEach(angular.mock.inject(function ($injector) {}));

		it('should pass sanity check', () => {
			expect(provider).toBeDefined();
		});
	});
});


angular.module('test.core', [
	core.name
]);
