import sharing from './sharing';


// Assume angular is available globally
const utils = angular
	.module('platform.utils', [
		'ui.router',
		sharing.name
	])
	.provider('platform', platformProvider);


function platformProvider($stateProvider, sharingProvider) {
	let registry = new Map();

	const ROOT_ROUTE = 'root';
	const PROJECT_ROOT_ROUTE = `${ROOT_ROUTE}.project`;

	return {
		register(component: string, {isProjectType = false, sharing = null} = {}) {
			registry.set(component, {isProjectType});

			if (sharing !== null && typeof sharing === 'object') {
				// Register sharing config for the root route
				sharingProvider.register(isProjectType ? `${PROJECT_ROOT_ROUTE}.${component}` : `${ROOT_ROUTE}.${component}`, sharing);
			}

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
			state = isProjectType ? `${PROJECT_ROOT_ROUTE}.${state}` : `${ROOT_ROUTE}.${state}`;
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
