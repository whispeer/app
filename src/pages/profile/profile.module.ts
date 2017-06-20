import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilePage } from './profile'

import { QRCodeModule } from "angular2-qrcode";
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ProfilePage,
	],
	imports: [
		IonicPageModule.forChild(ProfilePage),
		ComponentsModule,
		QRCodeModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		ProfilePage,
	]
})
export class ProfilePageModule {}
