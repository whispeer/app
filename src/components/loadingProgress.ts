import { Component, Input, ElementRef } from "@angular/core";

@Component({
	selector: "loading-progress",
	templateUrl: "loadingProgress.html"
})
export class LoadingProgress {

	className: string = ""

	@Input() progress: any
	@Input() parentBackgroundClass: string

	get progressArc() {
		const progress = this.progress()
		let deg, result
		if (progress <= 0.5) {
			deg = 90 + 180 * progress * 2
			result = `linear-gradient(90deg, blue 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(${deg}deg, yellow 50%, blue 50%, blue)`
		} else {
			deg = -90 + 180 * (2 * (progress-.5))
			result = `linear-gradient(${deg}deg, yellow 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, yellow 50%, blue 50%, blue)`
		}
		return result
	}

	private getBackgroundElement() {
		let element = this.element.nativeElement.parentElement
		while (element && !element.classList.contains(this.parentBackgroundClass)) {
			element = element.parentElement
		}
		return element
	}

	private _background;
	get background() {
		if (!this._background !== undefined) {
			const element = this.getBackgroundElement()
			if (!element) { this._background = 'inherit' }
			this._background = window.getComputedStyle(element)
			.getPropertyValue('background-color')
		}
		return this._background
	}

	constructor(private element: ElementRef) { }
}
