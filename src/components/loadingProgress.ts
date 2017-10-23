import { Component, Input } from "@angular/core";

@Component({
	selector: "loading-progress",
	templateUrl: "loadingProgress.html"
})
export class LoadingProgress {

	className: string = ""

	@Input() progress: any
	@Input() inverse: boolean = false

	@Input()
	set color(color: string) {
		color = color || ""
		this.className = "radial-progress"
		if(color.length > 0) {
			this.className = `${this.className}--${color}`
		}
		console.log(this.className)
	}

	getProgress = () => Math.floor(this.progress() * 100)

	constructor() {}
}
