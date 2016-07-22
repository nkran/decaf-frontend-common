import sharing from './sharing';


// TODO: implement unit tests for this module
describe('sharing', () => {
	describe('sharingProvider', () => {
		let provider;
		let sharing;

		beforeEach(angular.mock.module('test.sharing', ['sharingProvider', (sharingProvider) => {
			provider = sharingProvider;
		}]));

		beforeEach(angular.mock.inject(function ($injector) {
			sharing = $injector.get('sharing');
		}));

		it('should pass sanity check', () => {
			expect(provider).toBeDefined();
			expect(sharing).toBeDefined();
		});
	});
});


angular.module('test.sharing', [
	sharing.name
]);
