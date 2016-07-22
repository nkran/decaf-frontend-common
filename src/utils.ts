// Assume angular is available globally
const utils = angular
	.module('platform.utils', ['ui.router'])
	.provider('platform', platformProvider);


function platformProvider($stateProvider) {
	let registry = new Map();

	return {
		register(component: string, {isProjectType = false} = {}) {
			registry.set(component, {isProjectType});
			// Make it chainable
			return this;
		},
		state(state, config: any, {switchable = true} = {}): void {
			config = config || {};

			let componentConfig: any;
			let component: any = null;
			for (let comp of Array.from(registry.keys())) {
				if (state.startsWith(comp)) {
					component = comp;
					componentConfig =  angular.copy(registry.get(comp));
				}
			}

			let {isProjectType = false} = componentConfig || {};
			state = isProjectType ? `root.project.${state}` : `root.${state}`;
			let options = angular.copy(config);

			// Update the `{data}` with the component name
			let data = options.data || {};
			Object.assign(data, {
				component
			});

			// Update the `{data}` with the switchable state
			if (isProjectType && switchable) {
				Object.assign(data, {
					switchable: state
				});
			}

			Object.assign(options, {
				data
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

export default utils;
