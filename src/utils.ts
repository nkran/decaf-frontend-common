// Assume angular is available globally
const utils = angular
	.module('platform.utils', ['ui.router'])
	.provider('platformState', platformStateProvider);


function platformStateProvider($stateProvider) {
	return {
		state(state, config: any, {isProjectType = false} = {}): void {
			$stateProvider.state(isProjectType ? `root.project.${state}` : `root.${state}`, config);
			return this;
		},
		$get: [function () {
			return {};
		}]
	};
}

export default utils;
