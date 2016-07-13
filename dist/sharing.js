"use strict";
var angular_1 = require('angular');
/**
 * This is a service for transferring items between components.
 */
var sharing = angular_1.module('sharing', ['ui.router']).provider('sharing', sharingProvider);
function sharingProvider() {
    var registry = [];
    return {
        register: function (state, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? '' : _c, _d = _b.accept, accept = _d === void 0 ? [] : _d;
            registry.push({ state: state, name: name, accept: accept });
        },
        $get: ['$state', '$rootScope', function ($state, $rootScope) {
                var provided = {};
                var transfer = {};
                var Sharing = (function () {
                    function Sharing() {
                    }
                    Sharing.prototype.items = function (type, otherwise) {
                        if (otherwise === void 0) { otherwise = []; }
                        var values = transfer[type];
                        if (values instanceof Array) {
                            transfer = {};
                            return values;
                        }
                        else if (values !== undefined) {
                            transfer = {};
                            return [values];
                        }
                        else {
                            return otherwise;
                        }
                    };
                    Sharing.prototype.item = function (type, otherwise) {
                        if (otherwise === void 0) { otherwise = null; }
                        var value = transfer[type];
                        if (!(value === undefined || value instanceof Array)) {
                            transfer = {};
                            return value;
                        }
                        else {
                            return otherwise;
                        }
                    };
                    Sharing.prototype.provide = function (scope, sharable) {
                        var _this = this;
                        var _loop_1 = function(type) {
                            var watchExpression = sharable[type];
                            scope.$watch(watchExpression, function (value) {
                                if (value !== undefined) {
                                    provided[type] = value;
                                }
                                else {
                                    delete provided[type];
                                }
                                $rootScope.$broadcast('share-change', _this.targets);
                            });
                        };
                        for (var _i = 0, _a = Object.keys(sharable); _i < _a.length; _i++) {
                            var type = _a[_i];
                            _loop_1(type);
                        }
                        scope.$on('$destroy', function () {
                            provided = {};
                            $rootScope.$broadcast('share-change', []);
                        });
                    };
                    Object.defineProperty(Sharing.prototype, "targets", {
                        get: function () {
                            return registry.filter(function (_a) {
                                var accept = _a.accept;
                                return accept.some(function (_a) {
                                    var type = _a.type, multiple = _a.multiple;
                                    return provided[type] !== undefined && (multiple || !(provided[type] instanceof Array));
                                });
                            });
                        },
                        enumerable: true,
                        configurable: true
                    });
                    // TODO transfer to $stateParams if receiving state supports it (needs to be specified on register).
                    Sharing.prototype.open = function (state) {
                        transfer = provided;
                        return $state.go(state).then(function (state) {
                            transfer = {};
                            return state;
                        });
                    };
                    return Sharing;
                }());
                return new Sharing();
            }]
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sharing;
//# sourceMappingURL=sharing.js.map