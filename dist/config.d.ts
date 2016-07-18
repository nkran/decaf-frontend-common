declare const config: ng.IModule;
export declare class Config {
    private _config;
    get(key?: string): any;
    set(key: string, value: any): any;
    toJSON(): {};
}
export default config;
