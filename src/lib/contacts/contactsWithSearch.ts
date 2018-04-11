import { TranslateService } from '@ngx-translate/core'

const contactsService = require("../../lib/services/friendsService");
import userService from "../../lib/users/userService"

import * as Bluebird from 'bluebird';

import h from "../helper/helper";

import Memoizer from "../../lib/asset/memoizer"
import { isBusinessVersion } from "../../lib/services/location.manager"
import CompanyLoader, { getOwnCompanyID } from "../../lib/services/companyService"

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

			const colleaguesWithoutFriends = colleagues.filter((record) => !this.isFriend(record))

			return contacts.concat(colleaguesWithoutFriends).filter((contact) =>
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
		if (!isBusinessVersion()) {
			return Bluebird.resolve()
		}

		return getOwnCompanyID()
			.then((companyID) => CompanyLoader.get(companyID))
			.then((company) => {
				const colleagues = company.getUserIDs();

				if (h.arrayEqual(this.loadedColleagueIDs, colleagues)) {
					return Bluebird.resolve()
				}

				this.loadedColleagueIDs = colleagues.slice()

				return userService.getMultipleFormatted(colleagues)
					.then(ContactsWithSearch.sort)
					.then((result: any[]) => { this.colleagues = result })
			})
	}

	private loadContacts = () => {
		var contacts = contactsService.getFriends();

		if (h.arrayEqual(this.loadedContactIDs, contacts)) {
			return Bluebird.resolve(this.contacts)
		}

		this.loadedContactIDs = contacts.slice()

		return userService.getMultipleFormatted(contacts)
			.then((result: any[]) => ContactsWithSearch.sort(result))
			.then((result: any[]) => this.contacts = result)
	}

	private isFriend = (record) => record.isMyFriend

	private isColleague = (record) => this.colleagues.indexOf(record) > -1

	private getType = (record) => {
		if (this.isFriend(record)) {
			return "contacts"
		}

		if (this.isColleague(record)) {
			return "company"
		}

		return "global"
	}

	private typeDiffers = (record, previous) => {
		if (!previous) {
			return true
		}

		return this.getType(record) !== this.getType(previous)
	}

	private getSearchDividers = (record, previousRecord) => {
		if (this.typeDiffers(record, previousRecord)) {
			return this.translate.instant(`chooseFriends.${this.getType(record)}`)
		}

		return null
	}

	private firstCharDiffers = (record, previousRecord) => {
		if (!previousRecord) {
			return true
		}

		return record.name[0].toLowerCase() !== previousRecord.name[0].toLowerCase()
	}

	contactDividers = (record, recordIndex, records) => {
		const previousRecord = records[recordIndex - 1];

		if (this.searchTerm) {
			return this.getSearchDividers(record, previousRecord)
		}

		if(this.firstCharDiffers(record, previousRecord)) {
			return record.name[0].toUpperCase();
		}

		return null;
	}

	executeSearch = h.debounce(() => {
		this.searchResultsLoading = true;

		const query = this.searchTerm;

		userService.query(query).bind(this)
			.filter((user) => !this.isFriend(user.data) && !this.isColleague(user.data))
			.map((user) => this.searchTerm !== query ? [] : user.loadBasicData().thenReturn(user))
			.then((users) => this.searchTerm !== query ? [] : users.map((user) => user.data))
			.then((userData = []) => {
				this.searchResults = userData
				this.searchResultsLoading = false
			});
	}, 100)

	getUsers = () : any[] => this.memoizer.getValue()
}
