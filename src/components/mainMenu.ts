import { Component, Input, Output, EventEmitter } from "@angular/core"
import { NavController } from "ionic-angular"

import sessionService from "../lib/services/session.service"

@Component({
	selector: "main-menu",
	templateUrl: "mainMenu.html"
})
export class MainMenu {

	@Input() icon: string = "plus"

	@Output() invoke = new EventEmitter()

	constructor(private navCtrl: NavController) {}

	open = false

	closeOnTouchEnd = false

	onTap = () => {
		if (this.open) {
			this.open = false
		} else {
			this.invoke.emit()
		}
	}

	onPress = () => {
		if (this.open) {
			this.closeOnTouchEnd = true
		} else {
			this.open = true;
		}
	}

	onTouchStart = (e) => {
		console.log('touch start', e)
	}

	onTouchEnd = (e) => {
		if (this.closeOnTouchEnd) {
			this.open = false
			this.closeOnTouchEnd = false
		}
	}

	invokeProfile() {
		const userId = sessionService.userid
		this.navCtrl.push("Profile", { userId })
	}

	invokeContacts() {
		this.navCtrl.push("Contacts")
	}

	invokeSearch() {
		this.navCtrl.push("Contacts", { search: true })
	}

	invokeSettings() {
		this.navCtrl.push("Settings")
	}
}
