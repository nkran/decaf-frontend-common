"use strict";
// Assume angular is available globally
var utils = angular
    .module('platform.utils', ['ui.router'])
    .provider('platform', platformProvider);
function platformProvider($stateProvider) {
    var registry = new WeakMap();
    return {
        register: function (component, _a) {
            var _b = (_a === void 0 ? {} : _a).isProjectType, isProjectType = _b === void 0 ? false : _b;
            registry.set({ isProjectType: isProjectType }, component);
            // Make it chainable
            return this;
        },
        state: function (state, config, _a) {
            var _b = (_a === void 0 ? {} : _a).switchable, switchable = _b === void 0 ? true : _b;
            config = config || {};
            var componentConfig;
            var component = null;
            for (var _i = 0, _c = registry.entries(); _i < _c.length; _i++) {
                var _d = _c[_i], config_1 = _d[0], comp = _d[1];
                if (state.startsWith(comp)) {
                    componentConfig = angular.copy(config_1);
                    component = comp;
                }
            }
            var _e = (componentConfig || {}).isProjectType, isProjectType = _e === void 0 ? false : _e;
            state = isProjectType ? "root.project." + state : "root." + state;
            var options = angular.copy(config);
            if (isProjectType && switchable) {
                Object.assign(options, {
                    data: {
                        component: component,
                        switchable: state
                    }
                });
            }
            $stateProvider.state(state, options);
            // Make it chainable
            return this;
        },
        $get: [function () {
                return registry;
            }]
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = utils;
//# sourceMappingURL=utils.js.map