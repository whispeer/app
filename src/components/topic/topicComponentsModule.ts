import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SeperatorDatePipe } from "../../lib/pipes/seperatorDate";

import { TopicComponent } from "./topicDisplay"
import { BurstDifferenceComponent } from "./burstDifference"
import { MessageBurstComponent } from "./messageBurst"

import { SyntaxifyDirective } from "../syntaxify"

import { GalleryComponent } from "../gallery/gallery"

import { ComponentsModule } from "../components.module"

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		SeperatorDatePipe,
		TopicComponent,
		BurstDifferenceComponent,
		MessageBurstComponent,
		SyntaxifyDirective,
		GalleryComponent,
	],
	imports: [
		ComponentsModule,
		IonicModule,
		CommonModule,
		TranslateModule.forChild(),
	],
	exports: [
		SeperatorDatePipe,
		TopicComponent,
		BurstDifferenceComponent,
		MessageBurstComponent,
		SyntaxifyDirective,
		GalleryComponent,

		CommonModule,
	]
})
export class TopicComponentsModule { }
