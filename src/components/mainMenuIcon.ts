import { Component, Input } from "@angular/core"

@Component({
	selector: "main-menu-icon",
	templateUrl: "mainMenuIcon.html"
})
export class MainMenuIcon {
	@Input() icon: string = 'plus'
	constructor() { }
}
