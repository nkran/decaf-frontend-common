"use strict";
var angular = require("angular");
var projects_service_1 = require("./projects.service");
var nav_component_1 = require("./nav.component");
var project = angular.module('platform.project', [
    projects_service_1.default.name,
    nav_component_1.default.name
]);
project.config(function ($stateProvider) {
    // noinspection TypeScriptUnresolvedFunction
    $stateProvider
        .state('root.project', {
        abstract: true,
        url: '/project/{projectId:[0-9]+}',
        resolve: {
            project: ['$stateParams', 'projects', function ($stateParams, projects) { return projects.byId($stateParams.projectId); }]
        },
        onEnter: function ($stateParams, $state, projects, project) {
            // If the projectId was not passed redirect to first project
            var projectId = $stateParams.projectId;
            var id = projects.toArray()[0].id;
            if (!projectId && projectId != 0) {
                $state.go('root.project', {
                    projectId: id
                });
                return;
            }
            // noinspection TypeScriptUnresolvedFunction
            projects.current(project);
        },
        onExit: function (projects) {
            // noinspection TypeScriptUnresolvedFunction
            projects.current(null);
        }
    })
        .state('root.project.home', {
        url: '/',
        views: {
            'content@': {
                template: "\n\t\t\t\t\t\t<div layout-padding>\n\t\t\t\t\t\t\t<h1 class=\"md-title\">Project Home</h1>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"
            }
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = project;
//# sourceMappingURL=project.component.js.map