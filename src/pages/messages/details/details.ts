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
}
