import { Component, Input } from "@angular/core";

const DEFAULT_IMAGE = "assets/img/user.png"

@Component({
	selector: "user-image",
	templateUrl: "userImage.svg"
})
export class UserImageComponent {
	private _image: string = DEFAULT_IMAGE

	@Input()
	set image(image: string) {
		if (image) {
			this._image = image
			return
		}

		this._image = DEFAULT_IMAGE
	}

	get image(): string { return this._image; }

	@Input() id: string;

	randomId: string = Math.random().toString()

	getId() {
		return `userimage-${this.id}-${this.randomId}`
	}

	getUrl() {
		return `url(#${this.getId()})`
	}

	constructor() {};
}
