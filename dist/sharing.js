"use strict";
var project_component_1 = require('./project/project.component');
var states_1 = require('./states');
/**
 * This is a service for transferring items between components.
 */
// Assume angular is available globally
var sharing = angular
    .module('sharing', [
    'ngMaterial',
    'ui.router',
    project_component_1.default.name
])
    .provider('sharing', sharingProvider);
function sharingProvider() {
    var registry = [];
    return {
        register: function (state, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? '' : _c, _d = _b.accept, accept = _d === void 0 ? [] : _d;
            registry.push({ state: state, name: name, accept: accept });
        },
        $get: ['$rootScope', '$state', '$stateParams', '$mdDialog', function ($rootScope, $state, $stateParams, $mdDialog) {
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
                    Sharing.prototype.open = function (state, event) {
                        transfer = provided;
                        var projectId = $stateParams.projectId;
                        if (state.startsWith(states_1.PROJECT_ROOT_STATE) && (!projectId && projectId !== 0)) {
                            var dialog = {
                                targetEvent: event,
                                clickOutsideToClose: true,
                                fullscreen: true,
                                controller: (function () {
                                    function ProjectPickerDialog($mdDialog, projects) {
                                        this.$mdDialog = $mdDialog;
                                        this.projects = projects.toArray();
                                    }
                                    ProjectPickerDialog.prototype.done = function () {
                                        this.$mdDialog.hide(this.project);
                                    };
                                    ProjectPickerDialog.prototype.close = function () {
                                        this.$mdDialog.cancel();
                                    };
                                    return ProjectPickerDialog;
                                }()),
                                controllerAs: 'dialog',
                                template: "\n\t\t\t\t\t\t\t\t<md-dialog aria-label=\"Projects\">\n\t\t\t\t\t\t\t\t\t<md-toolbar>\n\t\t\t\t\t\t\t\t\t\t<div class=\"md-toolbar-tools\">\n\t\t\t\t\t\t\t\t\t\t\t<h2>Projects</h2>\n\t\t\t\t\t\t\t\t\t\t\t<span flex></span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</md-toolbar>\n\t\t\t\t\t\t\t\t\t<md-dialog-content>\n\t\t\t\t\t\t\t\t\t\t<div class=\"md-dialog-content\">\n\t\t\t\t\t\t\t\t\t\t\t<md-radio-group ng-model=\"dialog.project\">\n\t\t\t\t\t\t\t\t\t\t\t\t<md-radio-button ng-repeat=\"project in dialog.projects\" ng-value=\"project\" aria-label=\"{{project.name}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{project.name}}\n\t\t\t\t\t\t\t\t\t\t\t\t</md-radio-button>\n\t\t\t\t\t\t\t\t\t\t\t</md-radio-group>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</md-dialog-content>\n\t\t\t\t\t\t\t\t\t<md-dialog-actions layout=\"row\">\n\t\t\t\t\t\t\t\t\t\t<span flex></span>\n\t\t\t\t\t\t\t\t\t\t<md-button ng-click=\"dialog.close()\">\n\t\t\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t\t\t</md-button>\n\t\t\t\t\t\t\t\t\t\t<md-button ng-click=\"dialog.done()\" class=\"md-primary\">\n\t\t\t\t\t\t\t\t\t\t\tDone\n\t\t\t\t\t\t\t\t\t\t</md-button>\n\t\t\t\t\t\t\t\t\t</md-dialog-actions>\n\t\t\t\t\t\t\t\t</md-dialog>\n\t\t\t\t\t\t\t"
                            };
                            return $mdDialog.show(dialog).then(function (_a) {
                                var id = _a.id;
                                $state.go(state, { projectId: id }).then(function (state) {
                                    transfer = {};
                                    return state;
                                });
                            });
                        }
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
var SharingMenuController = (function () {
    function SharingMenuController(sharing) {
        this.sharing = sharing;
    }
    ;
    SharingMenuController.prototype.open = function (state, event) {
        this.sharing.open(state, event);
    };
    return SharingMenuController;
}());
sharing.component('sharingMenu', {
    bindings: {
        targets: '<'
    },
    controller: SharingMenuController,
    controllerAs: 'menu',
    template: "\n\t\t<md-menu ng-show=\"menu.targets.length\" md-position-mode=\"target-right target\">\n\t\t\t<md-button class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\">\n\t\t\t\t<md-icon>share</md-icon>\n\t\t\t</md-button>\n\n\t\t\t<md-menu-content width=\"4\">\n\t\t\t\t<md-menu-item ng-repeat=\"target in menu.targets\">\n\t\t\t\t\t<md-button ng-click=\"menu.open(target.state, $event)\">\n\t\t\t\t\t\t<div layout=\"row\">\n\t\t\t\t\t\t\t<p flex>{{target.name}}</p>\n\t\t\t\t\t\t\t<md-icon md-menu-align-target>share</md-icon>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</md-button>\n\t\t\t\t</md-menu-item>\n\t\t\t</md-menu-content>\n\t\t</md-menu>\n\t"
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sharing;
//# sourceMappingURL=sharing.js.map