import * as angular from 'angular';

const config = angular.module('platform.config', []);


export class Config {
	private _config = new Map();

	get(key?: string) {
		if (key) {
			return this._config.get(key);
		}
		return this.toJSON();
	}

	set(key: string, value: any) {
		this._config.set(key, value);
		return this._config.get(key);
	}

	toJSON() {
		let obj = {};
		for (let key of Array.from(this._config.keys())) {
			obj[key] = this._config.get(key);
		}
		return obj;
	}
}

config.service('config', Config);

export default config;
