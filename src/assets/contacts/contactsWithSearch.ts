const contactsService = require("../../assets/services/friendsService");
const userService = require("../../assets/user/userService");
import errorService from "../../assets/services/error.service";

import * as Bluebird from 'bluebird';

const h = require("whispeerHelper");

export class ContactsWithSearch {
	contacts: any[] = [];
	contactsLoading: boolean = true;

	searchResults: any[] = [];
	searchResultsLoading: boolean = false;

	searchTerm: string = "";

	protected loadContactsUsers = () => {
		return Bluebird.try(() => {
			var contacts = contactsService.getFriends();
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
			this.contactsLoading = false;
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

	getContacts = () =>  {
		if (!this.searchTerm) {
			return this.contacts;
		}

		return this.contacts.filter((contact) => {
			return contact.name.indexOf(this.searchTerm) > -1;
		});
	}

	getUsers = () => {
		return this.getContacts().concat(this.searchResults)
	}
}
