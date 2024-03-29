import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagesPage } from './messages'

import { ComponentsModule } from "../../components/components.module";
import { TopicComponentsModule } from "../../components/topic/topicComponentsModule";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		MessagesPage
	],
	imports: [
		IonicPageModule.forChild(MessagesPage),
		ComponentsModule,
		TopicComponentsModule,
		TranslateModule.forChild(),
	],
	entryComponents: [
		MessagesPage
	]
})
export class MessagesPageModule {}
