import { Component, Input } from "@angular/core";

@Component({
	selector: "loading-progress",
	templateUrl: "loadingProgress.html"
})
export class LoadingProgress {
	@Input() progress: any;
	@Input() inverse: boolean = false;

	getProgress = () => Math.floor(this.progress() * 100)

	constructor() {};
}
