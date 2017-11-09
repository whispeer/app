import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SeperatorDatePipe } from "../../lib/pipes/seperatorDate";

import { BurstDifferenceComponent } from "./burstDifference"
import { MessageComponent } from "./message"
import { VoicemailPlayerComponent } from "./voicemailPlayer"

import { SyntaxifyDirective } from "../syntaxify"
import { GalleryComponent } from "../gallery/gallery"
import { ComponentsModule } from "../components.module"

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		SeperatorDatePipe,
		BurstDifferenceComponent,
		SyntaxifyDirective,
		GalleryComponent,
		MessageComponent,
		VoicemailPlayerComponent,
	],
	imports: [
		ComponentsModule,
		IonicModule,
		CommonModule,
		TranslateModule.forChild(),
	],
	exports: [
		SeperatorDatePipe,
		BurstDifferenceComponent,
		SyntaxifyDirective,
		GalleryComponent,
		MessageComponent,
		VoicemailPlayerComponent,

		CommonModule,
	]
})
export class TopicComponentsModule { }
