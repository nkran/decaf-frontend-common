import projects, {Projects} from './projects.service';


const nav = angular.module('platform.project.nav', [
	projects.name
]);


class ProjectNavController {
	components: any[];
	private _projects: Projects<any>;
	private _$state: any;

	constructor($scope, $state, projects: Projects<any>) {
		this._$state = $state;
		this._projects = projects;

		$scope.$watchCollection('nav._components', (components) => {
			if (components) {
				this.components = components.filter(({isProjectType}) => isProjectType);
			}
		});
	}

	get projects() {
		// Turn off WS inspection for this
		// noinspection TypeScriptUnresolvedFunction
		return this._projects.toArray();
	}

	// We only update the project from within this component
	set project(value) {}

	get project() {
		// Turn off WS inspection for this
		// noinspection TypeScriptUnresolvedFunction
		return this._projects.current();
	}

	switchTo({id}) {
		const $state = this._$state;
		if (this.project == id) {
			$state.go('root.project.home', {projectId: id});
		} else {
			// Switch to a (different) project while staying in the same route.
			// Use the 'switchable' information on state.
			// Go up to nearest switchable state.
			if ($state.current.data && $state.current.data.switchable) {
				$state.go($state.current.data.switchable, {projectId: id}, {inherit: true});
			} else {
				$state.go('root.project.home', {projectId: id});
			}
		}
	}
}

nav.component('projectNav', {
	template: `
		<div ng-if="nav.projects.length && nav.components.length">
			<md-toolbar ng-style="{'background-color': nav.project.color || nav.color()}" class="component-color">
				<div class="md-toolbar-tools">
					<h1 flex>
						<a ng-if="nav.project" ui-sref="root.project.home({projectId: nav.project.id})">{{nav.project.name}}</a>
						<span ng-if="!nav.project">Platform</span>
					</h1>
		
					<md-menu md-position-mode="target-right target">
						<md-button aria-label="More" class="md-icon-button" ng-click="$mdOpenMenu($event)">
							<md-icon>arrow_drop_down</md-icon>
						</md-button>
						<md-menu-content width="4">
							<md-menu-item ui-sref="root.home">
								<md-button>
									<div layout="row">
										<p flex>Home</p>
										<md-icon md-menu-align-target>home</md-icon>
									</div>
								</md-button>
							</md-menu-item>
							<md-menu-divider></md-menu-divider>
							<md-menu-item ng-repeat="project in nav.projects">
								<md-button ng-click="nav.switchTo(project)">
									<div layout="row">
										<p flex>{{project.name}}</p>
										<md-icon md-menu-align-target ng-style="{color: project.color}">folder</md-icon>
									</div>
								</md-button>
							</md-menu-item>
						</md-menu-content>
					</md-menu>
				</div>
			</md-toolbar>
		
			<md-list ng-hide="nav.project">
				<md-subheader class="md-no-sticky">Projects</md-subheader>
				<md-list-item ng-repeat="project in nav.projects" ui-sref="root.project.home({projectId: project.id})">
					<md-icon ng-style="{color: project.color}">folder</md-icon>
					<p>{{ project.name }}</p>
				</md-list-item>
			</md-list>
		
			<md-list ng-if="nav.components" ng-show="nav.project">
				<md-list-item ng-repeat="component in nav.components" ui-sref="{{component.navigation.state}}">
					<md-icon>{{ component.navigation.icon }}</md-icon>
					<p>{{ component.navigation.label }}</p>
				</md-list-item>
			</md-list>
		</div>
	`,
	controller: ProjectNavController,
	controllerAs: 'nav',
	bindings: {
		_components: '=components',
		project: '=',
		color: '&'
	}
});


export default nav;
