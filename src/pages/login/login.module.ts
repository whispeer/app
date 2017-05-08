import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login'

import { ComponentsModule } from '../../components/components.module'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		LoginPage,
	],
	imports: [
		IonicPageModule.forChild(LoginPage),
		TranslateModule.forChild(),
		ComponentsModule,
	],
	entryComponents: [
		LoginPage,
	]
})
export class LoginPageModule { }
