import { Component, Input, Output, EventEmitter } from "@angular/core"
import { NavController } from "ionic-angular"

import sessionService from "../../lib/services/session.service"

const EASTER_EGG_THRESHOLD = 10 * 1000

interface NodeWithBounds {
	node: Element,
	bounds: ClientRect
}

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

	profile: NodeWithBounds = null
	search: NodeWithBounds = null
	contacts: NodeWithBounds = null
	settings: NodeWithBounds = null

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

	isOnSubmenu = (bounds: ClientRect, event: TouchEvent) => {
		const { left, top, width: diameter } = bounds
		const centerX = left + diameter / 2
		const centerY = top + diameter / 2
		for (let i = 0; i < event.changedTouches.length; i++) {
			const { clientX, clientY } = event.changedTouches.item(i)
			const distance = Math.sqrt(Math.pow(centerX - clientX, 2) + Math.pow(centerY - clientY, 2))
			if (distance < ( diameter / 2 ) * 1.5) return true
		}
		return false
	}

	getNodeWithBounds = (ancestor, selector) => {
		const node = ancestor.querySelector(selector)
		const bounds = node.getBoundingClientRect()
		return { node, bounds }
	}

	onTouchStart = (e) => {
		let menu = e.target
		while (menu && !menu.classList.contains('navigator')) {
			menu = menu.parentElement
		}
		if (menu) {
			this.profile = this.getNodeWithBounds(menu, '.sub-menu.profile')
			this.search = this.getNodeWithBounds(menu, '.sub-menu.search')
			this.contacts = this.getNodeWithBounds(menu, '.sub-menu.contacts')
			this.settings = this.getNodeWithBounds(menu, '.sub-menu.settings')
		}
		this.easterEgg = setTimeout(this.enableEasterEgg, EASTER_EGG_THRESHOLD)
	}

	onTouchEnd = (e: TouchEvent) => {
		const nodesWithBounds = [ this.search, this.profile, this.contacts, this.settings ]
		for (let { node } of nodesWithBounds ) {
			node.classList.remove('active')
		}
		if (this.open) {
			if (this.isOnSubmenu(this.profile.bounds, e)) this.invokeProfile()
			if (this.isOnSubmenu(this.search.bounds, e)) this.invokeSearch()
			if (this.isOnSubmenu(this.contacts.bounds, e)) this.invokeContacts()
			if (this.isOnSubmenu(this.settings.bounds, e)) this.invokeSettings()
		}
		if (this.closeOnTouchEnd) {
			this.open = false
			this.closeOnTouchEnd = false
		}
		clearTimeout(this.easterEgg)
	}

	onTouchMove = (e: TouchEvent) => {
		if (this.open) {
			for (let { node, bounds } of [this.profile, this.contacts, this.settings, this.search]) {
				if (this.isOnSubmenu(bounds, e)) {
					node.classList.add('active')
				} else {
					node.classList.remove('active')
				}
			}
		}
		e.preventDefault()
	}

	close() {
		this.open = false
	}

	invokeProfile() {
		this.close()
		const userId = sessionService.userid
		this.navCtrl.push("Profile", { userId })
	}

	invokeContacts() {
		this.close()
		this.navCtrl.push("Contacts")
	}

	invokeSearch() {
		this.close()
		this.navCtrl.push("Contacts", { search: true })
	}

	invokeSettings() {
		this.close()
		this.navCtrl.push("Settings")
	}
}
