// Assume angular is available globally
const projects = angular.module('platform.projects', []);

class Projects<T> implements Iterable<T> {
	private _current: any = null;

	// TODO: this is here to mock data, implement a way to actually get projects
	private _items: any[] = [
		{id: 0, name: 'Archimedes', color: '#5fc5ff'}
	];

	[Symbol.iterator](): Iterator<T> {
		return this._items.entries() as any;
	}

	byId(id) {
		return this.toArray().find((project) => (<any>project).id == id); // tslint:disable-line:triple-equals
	}

	current(project?: any) {
		if (project !== undefined) {
			let {id = null} = project || {};
			return this._current = this.byId(id);
		}

		return this._current;
	}

	toArray(): T[] {
		return this._items;
	}
}

projects.service('projects', Projects);
export {Projects};


export default projects;
