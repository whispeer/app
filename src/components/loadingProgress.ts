import { Component, Input, ElementRef } from "@angular/core";

@Component({
	selector: "loading-progress",
	templateUrl: "loadingProgress.html"
})
export class LoadingProgress {

	@Input() className: string
	@Input() progress: any
	@Input() backgroundClass: string
	@Input() foregroundClass: string

	private _progressColor
	private _progressBackground
	private _background;

	private getBackgroundElement() {
		let element = this.element.nativeElement.parentElement
		while (element && !element.classList.contains(this.backgroundClass)) {
			element = element.parentElement
		}
		return element
	}

	private getForegroundElement() {
		let element = this.element.nativeElement.querySelector('.dummy')
		return element.classList.contains(this.foregroundClass) ? element : null
	}

	private get progressColor() {
		if (!this._progressColor) {
			const element = this.getForegroundElement()
			this._progressColor = element? window.getComputedStyle(element)
				.getPropertyValue('color') : null
		}
		return this._progressColor
	}

	private get progressBackground() {
		if (!this._progressBackground) {
			const element = this.getForegroundElement()
			this._progressBackground = element? window.getComputedStyle(element)
				.getPropertyValue('background-color') : null
		}
		return this._progressBackground
	}

	get background() {
		if (!this._background !== undefined) {
			const element = this.getBackgroundElement()
			if (!element) { this._background = 'inherit' }
			this._background = window.getComputedStyle(element)
				.getPropertyValue('background-color')
		}
		return this._background
	}

	get progressArc() {
		const progress = this.progress()
		const { progressBackground, progressColor } = this
		if (!progressBackground || !progressColor) { return "" }
		let deg, result
		if (progress <= 0.5) {
			deg = 90 + 180 * progress * 2
			result = `linear-gradient(90deg, ${progressBackground} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(${deg}deg, ${progressColor} 50%, ${progressBackground} 50%, ${progressBackground})`
		} else {
			deg = -90 + 180 * (2 * (progress-.5))
			result = `linear-gradient(${deg}deg, ${progressColor} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, ${progressColor} 50%, ${progressBackground} 50%, ${progressBackground})`
		}
		return result
	}

	constructor(private element: ElementRef) { }
}
