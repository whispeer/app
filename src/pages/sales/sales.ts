import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";

import { TranslateService } from '@ngx-translate/core';

import { isBusinessVersion } from '../../lib/services/location.manager'

@IonicPage({
	name: "Sales",
	segment: "sales"
})
@Component({
	selector: 'page-sales',
	templateUrl: 'sales.html'
})
export class SalesPage {

	tutorialDisabled = true;

	business = isBusinessVersion();

	constructor(public navCtrl: NavController, private statusBar: StatusBar, private translate: TranslateService) {
		this.statusBar.styleDefault();

		if (!this.business) {
			this.goToBusiness()
		}
	}

	goToPrivateHome() {

	}

	goToBusiness() {

	}

	getTranslation(key) {
		return this.translate.instant(`sales.${key}`)
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad SalesPage");
	}

}
