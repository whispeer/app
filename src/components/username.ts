import { Component, Input } from "@angular/core";
import { UserInterface, NotExistingUser } from "../lib/users/user";

@Component({
	selector: "username",
	templateUrl: "username.html"
})
export class UsernameComponent {
	_user: UserInterface = new NotExistingUser();
	@Input() user;

	constructor() {};
}
