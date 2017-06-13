import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SalesPage } from './sales'

import { ComponentsModule } from '../../components/components.module'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		SalesPage,
	],
	imports: [
		IonicPageModule.forChild(SalesPage),
		TranslateModule.forChild(),
		ComponentsModule,
	],
	entryComponents: [
		SalesPage,
	]
})
export class SalesPageModule { }
