"use strict";
// Assume angular is available globally
var utils = angular
    .module('platform.utils', ['ui.router'])
    .provider('platform', platformProvider);
function platformProvider($stateProvider) {
    var registry = new Map();
    return {
        register: function (component, _a) {
            var _b = (_a === void 0 ? {} : _a).isProjectType, isProjectType = _b === void 0 ? false : _b;
            registry.set(component, { isProjectType: isProjectType });
            // Make it chainable
            return this;
        },
        state: function (state, config, _a) {
            var _b = (_a === void 0 ? {} : _a).switchable, switchable = _b === void 0 ? true : _b;
            config = config || {};
            var componentConfig;
            var component = null;
            for (var _i = 0, _c = Array.from(registry.keys()); _i < _c.length; _i++) {
                var comp = _c[_i];
                if (state.startsWith(comp)) {
                    component = comp;
                    componentConfig = angular.copy(registry.get(comp));
                }
            }
            var _d = (componentConfig || {}).isProjectType, isProjectType = _d === void 0 ? false : _d;
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