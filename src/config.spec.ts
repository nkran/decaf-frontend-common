import config, {Config} from './config';


describe('platform.config', () => {
	var cs: Config;

	beforeEach(angular.mock.inject(function () {
		var $injector = angular.injector([config.name]);
		cs = <Config>$injector.get('config');
	}));

	describe('config', () => {
		describe('.get()', () => {
			it('should get configuration by {key} all return everything', () => {
				let test = cs.get('test');
				expect(test).toBeUndefined();
				let everything = cs.get();
				expect(everything).toEqual({});
			});
		});

		describe('.set()', () => {
			it('should update configuration', () => {
				cs.set('test', {pass: true});
				expect(cs.get('test')).toEqual({pass: true});
			});
		});
	});
});


angular.module('test', [
	config.name
]);
