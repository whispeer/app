import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: "load",
	template: `<div [innerHTML]="html"></div>`
})
export class LoadComponent {
	public html;
	constructor(private sanitizer: DomSanitizer) {};

	@Input()
	set name(name: string) {
		const icon = require(`../assets/images/icons/${name}.svg`)

		this.html = this.sanitizer.bypassSecurityTrustHtml(icon)
	}
}
