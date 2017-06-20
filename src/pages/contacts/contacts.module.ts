import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactsPage } from './contacts'

import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ContactsPage
	],
	imports: [
		IonicPageModule.forChild(ContactsPage),
		ComponentsModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		ContactsPage
	]
})
export class ContactsPageModule {}
