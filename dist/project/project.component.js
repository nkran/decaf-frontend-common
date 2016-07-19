"use strict";
var projects_service_1 = require('./projects.service');
var nav_component_1 = require('./nav.component');
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
        onEnter: function (projects, project) {
            // noinspection TypeScriptUnresolvedFunction
            projects.current(project);
        },
        onExit: function (projects) {
            // noinspection TypeScriptUnresolvedFunction
            projects.current(null);
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = project;
//# sourceMappingURL=project.component.js.map