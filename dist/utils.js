"use strict";
var sharing_1 = require('./sharing');
// Assume angular is available globally
var utils = angular
    .module('platform.utils', [
    'ui.router',
    sharing_1.default.name
])
    .provider('platform', platformProvider);
function platformProvider($stateProvider, sharingProvider) {
    var registry = new Map();
    var ROOT_ROUTE = 'root';
    var PROJECT_ROOT_ROUTE = ROOT_ROUTE + ".project";
    return {
        register: function (component, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.isProjectType, isProjectType = _c === void 0 ? false : _c, _d = _b.sharing, sharing = _d === void 0 ? null : _d;
            registry.set(component, { isProjectType: isProjectType });
            if (sharing !== null && typeof sharing === 'object') {
                // Register sharing config for the root route
                sharingProvider.register(isProjectType ? PROJECT_ROOT_ROUTE + "." + component : ROOT_ROUTE + "." + component, sharing);
            }
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
            state = isProjectType ? PROJECT_ROOT_ROUTE + "." + state : ROOT_ROUTE + "." + state;
            var options = angular.copy(config);
            // Update the `{data}` with the component name
            var data = options.data || {};
            Object.assign(data, {
                component: component
            });
            // Update the `{data}` with the switchable state
            if (isProjectType && switchable) {
                Object.assign(data, {
                    switchable: state
                });
            }
            Object.assign(options, {
                data: data
            });
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