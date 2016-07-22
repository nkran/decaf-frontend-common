import utils from './utils';


// TODO: implement unit tests for this module
describe('utils', () => {
	describe('platformProvider', () => {
		let provider;

		beforeEach(angular.mock.module('test.utils', ['platformProvider', (platformProvider) => {
			provider = platformStateProvider;
		}]));

		beforeEach(angular.mock.inject(function ($injector) {}));

		it('should pass sanity check', () => {
			expect(provider).toBeDefined();
		});
	});
});


angular.module('test.utils', [
	utils.name
]);
