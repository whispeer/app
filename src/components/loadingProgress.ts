import { Component, Input, ElementRef } from "@angular/core";

@Component({
	selector: "loading-progress",
	templateUrl: "loadingProgress.html"
})
export class LoadingProgress {

	className: string = ""
	background: string

	@Input() progress: any
	@Input() inverse: boolean = false
	@Input() parentBackgroundClass: string

	@Input()
	set color(color: string) {
		color = color || ""
		this.className = "radial-progress"
		if(color.length > 0) {
			this.className = `${this.className}--${color}`
		}
		console.log(this.className)
	}

	private fetchBackground() {
		let element = this.element.nativeElement.parentElement
		while (element && !element.classList.contains(this.parentBackgroundClass)) {
			element = element.parentElement
		}
		if (!element) { return 'inherit' }
		return window.getComputedStyle(element)
			.getPropertyValue('background-color')
	}

	getProgress = () => {
		if (!this.background) { this.background = this.fetchBackground() }
		return Math.floor(this.progress() * 100)

	}

	constructor(private element: ElementRef) { }
}
