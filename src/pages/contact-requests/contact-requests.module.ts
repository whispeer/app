import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactRequestsPage } from './contact-requests'
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from "../../components/components.module";

@NgModule({
	declarations: [
		ContactRequestsPage
	],
	imports: [
		IonicPageModule.forChild(ContactRequestsPage),
		TranslateModule,
		ComponentsModule
	],
	entryComponents: [
		ContactRequestsPage
	]
})
export class ContactRequestPageModule {}
