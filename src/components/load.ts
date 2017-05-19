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
	set src(src: string) {
		fetch(src).then((res) => {
			return res.text();
		}).then((res: string) => {
			this.html = this.sanitizer.bypassSecurityTrustHtml(res);
		});
	}
}
