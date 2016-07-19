import projects, {Projects} from './projects.service';
import nav from './nav.component';

const project = angular.module('platform.project', [
	projects.name,
	nav.name
]);


project.config(function ($stateProvider) {
	// noinspection TypeScriptUnresolvedFunction
	$stateProvider
		.state('root.project', {
			abstract: true,
			url: '/project/{projectId:[0-9]+}',
			resolve: {
				project: ['$stateParams', 'projects', ($stateParams, projects: Projects<any>) => projects.byId($stateParams.projectId)]
			},
			onEnter(projects: Projects<any>, project) {
				// noinspection TypeScriptUnresolvedFunction
				projects.current(project);
			},
			onExit(projects: Projects<any>) {
				// noinspection TypeScriptUnresolvedFunction
				projects.current(null);
			}
		})
		.state('root.project.home', {
			url: '/',
			views: {
				'content@': {
					template: `
						<div layout-padding>
							<h1 class="md-title">Project Home</h1>
						</div>
					`
				}
			}
		});
});


class ProjectHomeController {
	constructor() {}
}

export default project;
