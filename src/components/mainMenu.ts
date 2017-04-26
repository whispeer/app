import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NavController, FabContainer } from "ionic-angular";

import sessionService from "../lib/services/session.service";

@Component({
	selector: "main-menu",
	templateUrl: "mainMenu.html"
})
export class MainMenu {
	@Input() icon: string = "md-add";

	@Output() mainHandle = new EventEmitter();

	constructor(private navCtrl: NavController) {};

	handleClick = ($event: any, fab: FabContainer) => {
		if($event.type === "press") {
			fab.toggleList();
		} else {
			if(fab._listsActive) {
				fab.close();
			} else {
				this.mainHandle.emit();
			}
		}
	}

	fabSideClick = (fab: FabContainer, what: string, params: any = {}) => {
		switch (what) {
			case "contacts":
				this.navCtrl.push("Contacts", params);
				break;
			case "profile":
				this.navCtrl.push("Profile", {
					...params,
					userId: sessionService.userid
				});
				break;
			case "settings":
				this.navCtrl.push("Settings", params);
				break;
			default:
				// code...
				break;
		}
		fab.close();
	}
}
