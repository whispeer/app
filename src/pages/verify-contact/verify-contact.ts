import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
	selector: 'page-verify-contact',
	templateUrl: 'verify-contact.html'
})
export class VerifyContactPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private barcodeScanner: BarcodeScanner) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad VerifyContactPage");

		this.barcodeScanner.scan().then((res) => {
			console.log(res);
		}).catch((err) => {
			console.error(err);
		});
	}

}
