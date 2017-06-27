import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DetailPage } from './details'

import { ComponentsModule } from "../../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		DetailPage,
	],
	imports: [
		IonicPageModule.forChild(DetailPage),
		ComponentsModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		DetailPage,
	]
})
export class DetailsPageModule { }

