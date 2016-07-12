import {dirname} from './path';

describe('path', () => {
	describe('dirname()', () => {
		it('should get the dir name based on a full path (including filename)', () => {
			let PATH = 'component/test/test.js';
			expect(dirname(PATH)).toEqual('component/test');
		});
	});
});
