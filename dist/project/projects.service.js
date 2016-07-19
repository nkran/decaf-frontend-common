"use strict";
// Assume angular is available globally
var projects = angular.module('platform.projects', []);
var Projects = (function () {
    function Projects() {
        this._current = null;
        // TODO: this is here to mock data, implement a way to actually get projects
        this._items = [
            { id: 0, name: 'Archimedes', color: '#5fc5ff' },
            { id: 1, name: 'Zeus', color: '#ea0766' }
        ];
    }
    Projects.prototype[Symbol.iterator] = function () {
        return this._items.entries();
    };
    Projects.prototype.byId = function (id) {
        return this.toArray().find(function (project) { return project.id == id; }); // tslint:disable-line:triple-equals
    };
    Projects.prototype.current = function (project) {
        if (project !== undefined) {
            var _a = (project || {}).id, id = _a === void 0 ? null : _a;
            return this._current = this.byId(id);
        }
        return this._current;
    };
    Projects.prototype.toArray = function () {
        return this._items;
    };
    return Projects;
}());
exports.Projects = Projects;
projects.service('projects', Projects);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = projects;
//# sourceMappingURL=projects.service.js.map