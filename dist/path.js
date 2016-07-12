"use strict";
// CommonJS `module.id` standard,
// is the path to the current file
// Check specs http://wiki.commonjs.org/wiki/Modules/1.1
function dirname(path) {
    if (path === void 0) { path = ''; }
    var filename = path.replace(/^.*[\\\/]/, ''); // Platform (Windows/Linux) agnostic
    path = path.replace(filename, '');
    var index = path.lastIndexOf('/');
    if (index !== -1) {
        path = path.substr(0, index);
    }
    return path;
}
exports.dirname = dirname;
//# sourceMappingURL=path.js.map