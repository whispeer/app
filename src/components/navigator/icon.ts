import { Component, Input } from "@angular/core"

@Component({
	selector: "navigator-icon",
	templateUrl: "icon.html"
})
export class NavigatorIcon {
	@Input() icon: string = 'plus'
	constructor() { }
}
