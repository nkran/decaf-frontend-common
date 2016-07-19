declare const projects: ng.IModule;
declare class Projects<T> implements Iterable<T> {
    private _current;
    private _items;
    [Symbol.iterator](): Iterator<T>;
    byId(id: any): T;
    current(project?: any): any;
    toArray(): T[];
}
export { Projects };
export default projects;
