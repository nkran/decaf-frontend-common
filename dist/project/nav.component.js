"use strict";
var angular = require("angular");
var projects_service_1 = require("./projects.service");
var nav = angular.module('platform.project.nav', [
    projects_service_1.default.name
]);
var ProjectNavController = (function () {
    function ProjectNavController($scope, $state, projects) {
        var _this = this;
        this._$state = $state;
        this._projects = projects;
        $scope.$watchCollection('nav._components', function (components) {
            if (components) {
                _this.components = components.filter(function (_a) {
                    var isProjectType = _a.isProjectType;
                    return isProjectType;
                });
            }
        });
    }
    Object.defineProperty(ProjectNavController.prototype, "projects", {
        get: function () {
            // Turn off WS inspection for this
            // noinspection TypeScriptUnresolvedFunction
            return this._projects.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectNavController.prototype, "project", {
        get: function () {
            // Turn off WS inspection for this
            // noinspection TypeScriptUnresolvedFunction
            return this._projects.current();
        },
        // We only update the project from within this component
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    ProjectNavController.prototype.switchTo = function (_a) {
        var id = _a.id;
        var $state = this._$state;
        if (this.project == id) {
            $state.go('root.project.home', { projectId: id });
        }
        else {
            // Switch to a (different) project while staying in the same route.
            // Use the 'switchable' information on state.
            // Go up to nearest switchable state.
            if ($state.current.data && $state.current.data.switchable) {
                $state.go($state.current.data.switchable, { projectId: id }, { inherit: true });
            }
            else {
                $state.go('root.project.home', { projectId: id });
            }
        }
    };
    return ProjectNavController;
}());
nav.component('projectNav', {
    template: "\n\t\t<div ng-if=\"nav.projects.length && nav.components.length\">\n\t\t\t<md-toolbar ng-style=\"{'background-color': nav.project.color || nav.color()}\" class=\"component-color\">\n\t\t\t\t<div class=\"md-toolbar-tools\">\n\t\t\t\t\t<h1 flex>\n\t\t\t\t\t\t<a ng-if=\"nav.project\" ui-sref=\"root.project.home({projectId: nav.project.id})\">{{nav.project.name}}</a>\n\t\t\t\t\t\t<span ng-if=\"!nav.project\">Platform</span>\n\t\t\t\t\t</h1>\n\n\t\t\t\t\t<md-menu md-position-mode=\"target-right target\">\n\t\t\t\t\t\t<md-button aria-label=\"More\" class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\">\n\t\t\t\t\t\t\t<md-icon>arrow_drop_down</md-icon>\n\t\t\t\t\t\t</md-button>\n\t\t\t\t\t\t<md-menu-content width=\"4\">\n\t\t\t\t\t\t\t<md-menu-item ui-sref=\"root.home\">\n\t\t\t\t\t\t\t\t<md-button>\n\t\t\t\t\t\t\t\t\t<div layout=\"row\">\n\t\t\t\t\t\t\t\t\t\t<p flex>Home</p>\n\t\t\t\t\t\t\t\t\t\t<md-icon md-menu-align-target>home</md-icon>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</md-button>\n\t\t\t\t\t\t\t</md-menu-item>\n\t\t\t\t\t\t\t<md-menu-divider></md-menu-divider>\n\t\t\t\t\t\t\t<md-menu-item ng-repeat=\"project in nav.projects\">\n\t\t\t\t\t\t\t\t<md-button ng-click=\"nav.switchTo(project)\">\n\t\t\t\t\t\t\t\t\t<div layout=\"row\">\n\t\t\t\t\t\t\t\t\t\t<p flex>{{project.name}}</p>\n\t\t\t\t\t\t\t\t\t\t<md-icon md-menu-align-target ng-style=\"{color: project.color}\">folder</md-icon>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</md-button>\n\t\t\t\t\t\t\t</md-menu-item>\n\t\t\t\t\t\t</md-menu-content>\n\t\t\t\t\t</md-menu>\n\t\t\t\t</div>\n\t\t\t</md-toolbar>\n\n\t\t\t<md-list ng-hide=\"nav.project\">\n\t\t\t\t<md-subheader class=\"md-no-sticky\">Projects</md-subheader>\n\t\t\t\t<md-list-item ng-repeat=\"project in nav.projects\" ui-sref=\"root.project.home({projectId: project.id})\">\n\t\t\t\t\t<md-icon ng-style=\"{color: project.color}\">folder</md-icon>\n\t\t\t\t\t<p>{{ project.name }}</p>\n\t\t\t\t</md-list-item>\n\t\t\t</md-list>\n\n\t\t\t<md-list ng-if=\"nav.components\" ng-show=\"nav.project\">\n\t\t\t\t<md-list-item ng-repeat=\"component in nav.components\" ui-sref=\"{{component.navigation.state}}\">\n\t\t\t\t\t<md-icon>{{ component.navigation.icon }}</md-icon>\n\t\t\t\t\t<p>{{ component.navigation.label }}</p>\n\t\t\t\t</md-list-item>\n\t\t\t</md-list>\n\t\t</div>\n\t",
    controller: ProjectNavController,
    controllerAs: 'nav',
    bindings: {
        _components: '=components',
        project: '=',
        color: '&'
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = nav;
//# sourceMappingURL=nav.component.js.map