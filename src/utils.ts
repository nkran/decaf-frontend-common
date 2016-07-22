// Assume angular is available globally
const utils = angular
	.module('platform.utils', ['ui.router'])
	.provider('platform', platformProvider);


function platformProvider($stateProvider) {
	let registry = new WeakMap();

	return {
		register(component: string, {isProjectType = false} = {}) {
			registry.set({isProjectType}, component);
			// Make it chainable
			return this;
		},
		state(state, config: any, {switchable = true} = {}): void {
			config = config || {};

			let componentConfig: any;
			let component: any = null;
			for (let [config, comp] of (<any>registry).entries()) {
				if (state.startsWith(comp)) {
					componentConfig =  angular.copy(config);
					component = comp;
				}
			}

			let {isProjectType = false} = componentConfig || {};
			state = isProjectType ? `root.project.${state}` : `root.${state}`;
			let options = angular.copy(config);

			if (isProjectType && switchable) {
				Object.assign(options, {
					data: {
						component,
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

export default utils;
