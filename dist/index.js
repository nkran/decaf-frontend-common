"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Export everything
var config_1 = require('./config');
exports.config = config_1.default;
__export(require('./config'));
var path_1 = require('./path');
exports.dirname = path_1.dirname;
var sharing_1 = require('./sharing');
exports.sharing = sharing_1.default;
//# sourceMappingURL=index.js.map