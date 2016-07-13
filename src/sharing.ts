/**
 * This is a service for transferring items between components.
 */
// Assume angular is available globally
const sharing = angular
	.module('sharing', ['ui.router'])
	.provider('sharing', sharingProvider);


function sharingProvider() {
	let registry = [];

	return {
		register(state, {name = '', accept = []} = {}) {
			registry.push({state, name, accept});
		},
		$get: ['$state', '$rootScope', function ($state, $rootScope) {
			let provided = {};
			let transfer = {};

			class Sharing {
				items(type, otherwise = []) {
					let values = transfer[type];
					if (values instanceof Array) {
						transfer = {};
						return values;
					} else if (values !== undefined) {
						transfer = {};
						return [values];
					} else {
						return otherwise;
					}
				}

				item(type, otherwise = null) {
					let value = transfer[type];
					if (!(value === undefined || value instanceof Array)) {
						transfer = {};
						return value;
					} else {
						return otherwise;
					}
				}

				provide(scope, sharable) {
					for (let type of Object.keys(sharable)) {
						let watchExpression = sharable[type];

						scope.$watch(watchExpression, (value) => {
							if (value !== undefined) {
								provided[type] = value;
							} else {
								delete provided[type];
							}

							$rootScope.$broadcast('share-change', this.targets);
						});
					}

					scope.$on('$destroy', function () {
						provided = {};
						$rootScope.$broadcast('share-change', []);
					});
				}

				get targets() {
					return registry.filter(
						({accept}) => accept.some(({type, multiple}) => provided[type] !== undefined && (multiple || !(provided[type] instanceof Array)))
					);
				}

				// TODO transfer to $stateParams if receiving state supports it (needs to be specified on register).
				open(state) {
					transfer = provided;
					return $state.go(state).then((state) => {
						transfer = {};
						return state;
					});
				}
			}

			return new Sharing();
		}]
	};
}

export default sharing;
