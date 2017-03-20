import { Component, Input } from "@angular/core";

@Component({
	selector: "user-image",
	templateUrl: "userImage.svg"
})
export class UserImageComponent {
	@Input() image: string = "/assets/img/user.png";
	@Input() id: string;

	constructor() {};
}
