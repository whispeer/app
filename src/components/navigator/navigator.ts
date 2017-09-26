import { Component, Input, Output, EventEmitter } from "@angular/core"
import { NavController } from "ionic-angular"

import sessionService from "../../lib/services/session.service"

const EASTER_EGG_THRESHOLD = 10 * 1000

@Component({
	selector: "navigator",
	templateUrl: "navigator.html"
})
export class Navigator {

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

	easterEgg = null
	enableEasterEgg = () => {
		const navigators = document.querySelectorAll('.navigator');
		for (let i = 0 ; i < navigators.length; i++) {
			navigators.item(i).classList.add('easteregg')
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

	onTouchStart = (e) => {
		let menu = e.target
		while (menu && !menu.classList.contains('navigator')) {
			menu = menu.parentElement
		}
		if (menu) {
			this.profileNode = menu.querySelector('.sub-menu.profile')
			this.searchNode = menu.querySelector('.sub-menu.search')
			this.contactsNode = menu.querySelector('.sub-menu.contacts')
			this.settingsNode = menu.querySelector('.sub-menu.settings')
		}
		this.easterEgg = setTimeout(this.enableEasterEgg, EASTER_EGG_THRESHOLD)
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
		clearTimeout(this.easterEgg)
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
