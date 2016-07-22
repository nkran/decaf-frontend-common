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
var project_component_1 = require('./project/project.component');
exports.project = project_component_1.default;
__export(require('./project/projects.service'));
var sharing_1 = require('./sharing');
exports.sharing = sharing_1.default;
var utils_1 = require('./utils');
exports.utils = utils_1.default;
//# sourceMappingURL=index.js.map