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

	profileNode: Element = null
	searchNode: Element = null
	contactsNode: Element = null
	settingsNode: Element = null

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
		let menu = e.target
		while (menu && !menu.classList.contains('main-menu')) {
			menu = menu.parentElement
		}
		if (menu) {
			this.profileNode = menu.querySelectorAll('.sub-menu.profile')[0]
			this.searchNode = menu.querySelectorAll('.sub-menu.search')[0]
			this.contactsNode = menu.querySelectorAll('.sub-menu.contacts')[0]
			this.settingsNode = menu.querySelectorAll('.sub-menu.settings')[0]
		}
	}

	isOnSubmenu = (node, event) => {
		const { left, top, width: diameter } = node.getBoundingClientRect()
		const centerX = left + diameter / 2
		const centerY = top + diameter / 2
		for (let touch of event.changedTouches) {
			const { clientX, clientY } = touch
			const distance = Math.sqrt(Math.pow(centerX - clientX, 2) + Math.pow(centerY - clientY, 2))
			if (distance < ( diameter / 2 ) * 1.5) return true
		}
		return false
	}

	onTouchEnd = (e) => {
		const nodes = [this.profileNode, this.contactsNode, this.settingsNode, this.searchNode]
		for (let node of nodes ) {
			node.classList.remove('active')
		}

		if (this.open) {
			if (this.isOnSubmenu(this.profileNode, e)) this.invokeProfile()
			if (this.isOnSubmenu(this.searchNode, e)) this.invokeSearch()
			if (this.isOnSubmenu(this.contactsNode, e)) this.invokeContacts()
			if (this.isOnSubmenu(this.settingsNode, e)) this.invokeSettings()
		}
		if (this.closeOnTouchEnd) {
			this.open = false
			this.closeOnTouchEnd = false
		}
	}

	onTouchMove = (e) => {
		if (this.open) {
			for (let node of [this.profileNode, this.contactsNode, this.settingsNode, this.searchNode]) {
				if (this.isOnSubmenu(node, e)) {
					node.classList.add('active')
				} else {
					node.classList.remove('active')
				}
			}
		}
		e.preventDefault()
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
