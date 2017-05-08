import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactRequestsPage } from './contact-requests'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ContactRequestsPage
	],
	imports: [
		IonicPageModule.forChild(ContactRequestsPage),
		TranslateModule
	],
	entryComponents: [
		ContactRequestsPage
	]
})
export class ContactRequestPageModule {}
