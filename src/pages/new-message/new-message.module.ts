import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NewMessagePage } from './new-message'

import { ComponentsModule } from "../../components/components.module";
import { TopicComponentsModule } from "../../components/topic/topicComponentsModule";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		NewMessagePage,
	],
	imports: [
		IonicPageModule.forChild(NewMessagePage),
		ComponentsModule,
		TopicComponentsModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		NewMessagePage,
	]
})
export class NewMessagePageModule {}
