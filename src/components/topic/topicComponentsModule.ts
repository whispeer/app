import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SeperatorDatePipe } from "../../lib/pipes/seperatorDate";

import { TopicComponent } from "./topicDisplay"
import { BurstDifferenceComponent } from "./burstDifference"
import { MessageComponent } from "./message"

import { SyntaxifyDirective } from "../syntaxify"

import { GalleryComponent } from "../gallery/gallery"

import { ComponentsModule } from "../components.module"

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		SeperatorDatePipe,
		TopicComponent,
		BurstDifferenceComponent,
		SyntaxifyDirective,
		GalleryComponent,
		MessageComponent,
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
		SyntaxifyDirective,
		GalleryComponent,
		MessageComponent,

		CommonModule,
	]
})
export class TopicComponentsModule { }