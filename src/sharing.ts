import * as angular from 'angular';

import project from './project/project.component';
import {PROJECT_ROOT_STATE} from './states';


/**
 * This is a service for transferring items between components.
 */
// Assume angular is available globally
const sharing = angular
	.module('sharing', [
		'ngMaterial',
		'ui.router',
		project.name
	])
	.provider('sharing', sharingProvider);


function sharingProvider() {
	let registry = [];

	return {
		register(state, {name = '', accept = []} = {}) {
			registry.push({state, name, accept});
		},
		$get: ['$rootScope', '$state', '$stateParams', '$mdDialog', function ($rootScope, $state, $stateParams, $mdDialog) {
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
				open(state, event) {
					transfer = provided;

					let {projectId} = $stateParams;
					if (state.startsWith(PROJECT_ROOT_STATE) && (!projectId && projectId !== 0)) {
						const dialog = {
							targetEvent: event,
							clickOutsideToClose: true,
							fullscreen: true,
							controller: class ProjectPickerDialog {
								projects: any[];
								project: any;
								private $mdDialog: any;

								constructor($mdDialog, projects) {
									this.$mdDialog = $mdDialog;
									this.projects = projects.toArray();
								}
								done() {
									this.$mdDialog.hide(this.project);
								}
								close() {
									this.$mdDialog.cancel();
								}
							},
							controllerAs: 'dialog',
							template: `
								<md-dialog aria-label="Projects">
									<md-toolbar>
										<div class="md-toolbar-tools">
											<h2>Projects</h2>
											<span flex></span>
										</div>
									</md-toolbar>
									<md-dialog-content>
										<div class="md-dialog-content">
											<md-radio-group ng-model="dialog.project">
												<md-radio-button ng-repeat="project in dialog.projects" ng-value="project" aria-label="{{project.name}}">
													{{project.name}}
												</md-radio-button>
											</md-radio-group>
										</div>
									</md-dialog-content>
									<md-dialog-actions layout="row">
										<span flex></span>
										<md-button ng-click="dialog.close()">
											Cancel
										</md-button>
										<md-button ng-click="dialog.done()" class="md-primary">
											Done
										</md-button>
									</md-dialog-actions>
								</md-dialog>
							`
						};

						return $mdDialog.show(dialog).then(({id}) => {
							$state.go(state, {projectId: id}).then((state) => {
								transfer = {};
								return state;
							});
						});
					}

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


class SharingMenuController {
	targets: any[];

	constructor($scope, private sharing) {
		// Listen for share changes
		$scope.$on('share-change', (event, targets) => {
			this.targets = targets;
		});
	}

	open(state, event) {
		this.sharing.open(state, event);
	}
}

sharing.component('sharingMenu', {
	bindings: {},
	controller: SharingMenuController,
	controllerAs: 'menu',
	template: `
		<md-menu ng-show="menu.targets.length" md-position-mode="target-right target">
			<md-button class="md-icon-button" ng-click="$mdOpenMenu($event)">
				<md-icon>share</md-icon>
			</md-button>

			<md-menu-content width="4">
				<md-menu-item ng-repeat="target in menu.targets">
					<md-button ng-click="menu.open(target.state, $event)">
						<div layout="row">
							<p flex>{{target.name}}</p>
							<md-icon md-menu-align-target>share</md-icon>
						</div>
					</md-button>
				</md-menu-item>
			</md-menu-content>
		</md-menu>
	`
});


export default sharing;
