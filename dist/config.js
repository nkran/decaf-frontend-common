"use strict";
var angular = require("angular");
var config = angular.module('platform.config', []);
var Config = (function () {
    function Config() {
        this._config = new Map();
    }
    Config.prototype.get = function (key) {
        if (key) {
            return this._config.get(key);
        }
        return this.toJSON();
    };
    Config.prototype.set = function (key, value) {
        this._config.set(key, value);
        return this._config.get(key);
    };
    Config.prototype.toJSON = function () {
        var obj = {};
        for (var _i = 0, _a = Array.from(this._config.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            obj[key] = this._config.get(key);
        }
        return obj;
    };
    return Config;
}());
exports.Config = Config;
config.service('config', Config);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
//# sourceMappingURL=config.js.map