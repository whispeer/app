import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BlockedUsersPage } from './blockedUsers'

import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		BlockedUsersPage
	],
	imports: [
		IonicPageModule.forChild(BlockedUsersPage),
		ComponentsModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		BlockedUsersPage
	]
})
export class ContactsPageModule {}
