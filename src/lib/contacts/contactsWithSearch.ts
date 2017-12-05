import { TranslateService } from '@ngx-translate/core'

const contactsService = require("../../lib/services/friendsService");
const userService = require("../../lib/users/userService").default;
import errorService from "../../lib/services/error.service";

import * as Bluebird from 'bluebird';

import h from "../helper/helper";

import Memoizer from "../../lib/asset/memoizer"

const CONTACTS_VIEW = "contacts"

export class ContactsWithSearch {
	contacts: any[] = []
	requests: any[] = []
	contactsLoading: boolean = true

	colleagues: any[] = []
	colleaguesLoading: boolean = true

	searchResults: any[] = []
	searchResultsLoading: boolean = false

	loadedContactIDs: number[] = []
	loadedColleagueIDs: number[] = []

	searchTerm: string = ""

	view: string = "contacts"

	private memoizer: Memoizer

	constructor(public translate: TranslateService) {
		this.memoizer = new Memoizer([
			() => this.contacts,
			() => this.colleagues,

			() => this.view,

			() => this.searchResults,
			() => this.searchTerm
		], (contacts, colleagues, view, searchResults, searchTerm) => {
			if (!searchTerm) {
				return view === CONTACTS_VIEW ? contacts : colleagues
			}

			return contacts.concat(colleagues).filter((contact) =>
				contact.names.searchName.indexOf(searchTerm.toLowerCase()) > -1
			).concat(searchResults)
		})
	}

	init = () => {
		contactsService.awaitLoading().then(() => {
			contactsService.listen(this.load);
			return this.load()
		})
	}

	private load = () => {
		this.requests = contactsService.getRequests()

		return this.loadContacts()
			.then(() => this.contactsLoading = false)
			.then(() => this.loadColleagues())
			.then(() => this.colleaguesLoading = false)
	}

	static sort = (users) => users.sort((a: any, b: any): number => {
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

	private loadColleagues = () => {
		var colleagues = contactsService.getFriends();

		if (h.arrayEqual(this.loadedColleagueIDs, colleagues)) {
			return Bluebird.resolve()
		}

		this.loadedColleagueIDs = colleagues.slice()

		return userService.getMultipleFormatted(colleagues)
			.then(ContactsWithSearch.sort)
			.then((result: any[]) => this.colleagues = result)
	}

	private loadContacts = () => {
		var contacts = contactsService.getFriends();

		if (h.arrayEqual(this.loadedContactIDs, contacts)) {
			return Bluebird.resolve()
		}

		this.loadedContactIDs = contacts.slice()

		return userService.getMultipleFormatted(contacts)
			.then((result: any[]) => ContactsWithSearch.sort(result))
			.then((result: any[]) => this.contacts = result)
	}

	contactDividers = (record, recordIndex, records) => {
		const firstChar: string = record.name[0];

		if(recordIndex === 0) {
			if (this.searchTerm) {
				if (record.isMyFriend) {
					return this.translate.instant("chooseFriends.contacts")
				} else {
					return this.translate.instant("chooseFriends.global")
				}
			}

			return firstChar.toUpperCase();
		}

		const previousEntry = records[recordIndex - 1];

		if (this.searchTerm) {
			if (previousEntry.isMyFriend && !record.isMyFriend) {
				return this.translate.instant("chooseFriends.global")
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
				user.loadBasicData().catch(errorService.criticalError);
				return user.data;
			});
		}).then((userData) => {
			this.searchResults = userData || [];
			this.searchResultsLoading = false;
		});
	}, 100)

	getUsers = () : any[] => this.memoizer.getValue()
}
