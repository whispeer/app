import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddPage } from './add'

import { ComponentsModule } from "../../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		AddPage,
	],
	imports: [
		IonicPageModule.forChild(AddPage),
		ComponentsModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		AddPage,
	]
})
export class AddPageModule { }

