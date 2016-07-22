"use strict";
// Assume angular is available globally
var utils = angular
    .module('platform.utils', ['ui.router'])
    .provider('platformState', platformStateProvider);
function platformStateProvider($stateProvider) {
    return {
        state: function (state, config, _a) {
            var _b = (_a === void 0 ? {} : _a).isProjectType, isProjectType = _b === void 0 ? false : _b;
            $stateProvider.state(isProjectType ? "root.project." + state : "root." + state, config);
        },
        $get: [function () {
                return {};
            }]
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = utils;
//# sourceMappingURL=utils.js.map