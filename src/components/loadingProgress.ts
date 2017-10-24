import { Component, Input, ElementRef } from "@angular/core";

@Component({
	selector: "loading-progress",
	templateUrl: "loadingProgress.html"
})
export class LoadingProgress {

	className: string = ""

	@Input() progress: any
	@Input() parentBackgroundClass: string

	private getBackgroundElement() {
		let element = this.element.nativeElement.parentElement
		while (element && !element.classList.contains(this.parentBackgroundClass)) {
			element = element.parentElement
		}
		return element
	}

	private _background:string;
	get background():string {
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
