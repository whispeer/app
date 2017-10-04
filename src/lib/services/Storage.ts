import * as Bluebird from "bluebird";

export default class Storage {
	private _prefix: string

	constructor(prefix: string) {
		this._prefix = prefix;
	}

	get = (key: string): any =>
		localStorage.getItem(this.calculateKey(key))

	set = (key: string, data: any) =>
		localStorage.setItem(this.calculateKey(key), data);

	remove = (key: string) =>
		localStorage.removeItem(this.calculateKey(key));

	clear = () =>
		Bluebird.resolve(localStorage.clear())

	save = () =>
		Bluebird.resolve()

	private calculateKey = (key: string) =>
		this._prefix + "." + key;

	awaitLoading = () => Bluebird.resolve()
}
