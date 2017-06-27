import { Component, ElementRef } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";

import TopicUpdate from "../../lib/messages/topicTitleUpdate";
import errorService from "../../lib/services/error.service";

@IonicPage({
	name: "Chat Details",
	segment: "messages/:topicId/details",
})
@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailPage {
	topicId: number;

	constructor(public navParams: NavParams, private element: ElementRef) {
	}

	ngOnInit() {
		this.topicId = parseFloat(this.navParams.get("topicId"));
		console.log('Init details page for topic', this.topicId);
	}
}
