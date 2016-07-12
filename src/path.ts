// CommonJS `module.id` standard,
// is the path to the current file
// Check specs http://wiki.commonjs.org/wiki/Modules/1.1
export function dirname(path = '') {
	let filename = path.replace(/^.*[\\\/]/, ''); // Platform (Windows/Linux) agnostic

	path = path.replace(filename, '');

	let index = path.lastIndexOf('/');

	if (index !== -1) {
		path = path.substr(0, index);
	}

	return path;
}
