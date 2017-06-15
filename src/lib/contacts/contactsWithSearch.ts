const contactsService = require("../../lib/services/friendsService");
const userService = require("../../lib/user/userService");
import errorService from "../../lib/services/error.service";

import * as Bluebird from 'bluebird';

import h from "../helper/helper";

class Memoizer {
	values: any[]
	cachedValue: any
	constructor(private selectors: Function[], private reduce: Function) {}

	getValue() {
		const newValues = this.selectors.map((selector) => selector())

		const changed = !this.values || newValues.some((val, index) => this.values[index] !== val)

		if (!changed) {
			return this.cachedValue
		}

		console.warn("Memoizer recalculated", this.values, newValues)

		this.values = newValues
		this.cachedValue = this.reduce(...this.values)

		return this.cachedValue
	}
}

const filterContacts = (contacts, searchTerm) => {
	if (!searchTerm) {
		return contacts;
	}

	return contacts.filter((contact) => {
		return contact.names.searchName.indexOf(searchTerm) > -1;
	});
}

export class ContactsWithSearch {
	contacts: any[] = [];
	contactsLoading: boolean = true;

	searchResults: any[] = [];
	searchResultsLoading: boolean = false;

	loadedContactIDs: number[] = []

	searchTerm: string = "";

	memoizer: Memoizer

	constructor() {
		this.memoizer = new Memoizer([
			() => this.contacts,
			() => this.searchResults,
			() => this.searchTerm
		], (contacts, searchResults, searchTerm) => {
			return filterContacts(contacts, searchTerm).concat(searchResults)
		})
	}

	protected loadContactsUsers = () => {
		var contacts = contactsService.getFriends();

		if (h.arrayEqual(this.loadedContactIDs, contacts)) {
			return Bluebird.resolve()
		}

		this.loadedContactIDs = contacts.slice()

		return Bluebird.try(() => {
			return userService.getMultipleFormatted(contacts);
		}).then((result: any[]) => {
			return result.sort((a: any, b: any): number => {
				const firstAvailable = a.names.firstname && b.names.firstname;
				const lastAvailable = a.names.lastname && b.names.firstname;

				if(!firstAvailable && !lastAvailable) {
					return a.name.localeCompare(b.name);
				} else if (!firstAvailable) {
					return a.names.lastname.localeCompare(b.names.lastname);
				} else {
					return a.names.firstname.localeCompare(b.names.firstname);
				}
			});
		}).then((result: any[]) => {
			this.contacts = result;
		})
	}

	contactDividers = (record, recordIndex, records) => {
		const firstChar: string = record.name[0];

		if(recordIndex === 0) {
			if (this.searchTerm) {
				if (record.isMyFriend) {
					return "Contacts";
				} else {
					return "Global";
				}
			}

			return firstChar.toUpperCase();
		}

		const previousEntry = records[recordIndex - 1];

		if (this.searchTerm) {
			if (previousEntry.isMyFriend && !record.isMyFriend) {
				return "Global";
			}

			return null;
		}

		if(firstChar.toLowerCase() !== previousEntry.name[0].toLowerCase()) {
			return firstChar.toUpperCase();
		}

		console.log('return null')

		return null;
	}

	executeSearch = h.debounce(() => {
		this.searchResultsLoading = true;

		const query = this.searchTerm;
		const contacts = contactsService.getFriends();

		userService.query(query).bind(this).filter((user) => {
			return contacts.indexOf(user.getID()) === -1;
		}).map(function (user) {
			if (this.searchTerm !== query) {
				return;
			}

			return user.loadBasicData().thenReturn(user);
		}).then(function (users) {
			if (this.searchTerm !== query) {
				return;
			}

			return users.map(function (user) {
				user.loadFullData(errorService.criticalError);
				return user.data;
			});
		}).then((userData) => {
			this.searchResults = userData || [];
			this.searchResultsLoading = false;
		});
	}, 100)

	getUsers = () => {
		return this.memoizer.getValue()
	}
}
