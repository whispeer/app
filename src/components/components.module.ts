import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SafeUrl } from "../lib/pipes/safeStyle";
import { ResponsiveDatePipe } from "../lib/pipes/responsiveDate";
import { SeperatorDatePipe } from "../lib/pipes/seperatorDate";
import { MaxValuePipe } from "../lib/pipes/maxValue";

import { UserImageComponent } from "./userImage";
import { MainMenu } from "./mainMenu";
import { HexagonModule } from "./hexagonModule";
import { TopicComponent } from "./topicDisplay"
import { BurstDifferenceComponent } from "./burstDifference"
import { SyntaxifyDirective } from "./syntaxify"
import { ChooseFriends } from "./chooseFriends"
import { GalleryComponent } from "./gallery/gallery"

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		SeperatorDatePipe,
		SafeUrl,
		MaxValuePipe,
		MainMenu,
		UserImageComponent,
		TopicComponent,
		BurstDifferenceComponent,
		SyntaxifyDirective,
		GalleryComponent,
		ChooseFriends,
	],
	imports: [
		HexagonModule,
		IonicModule,
		CommonModule,
		TranslateModule.forChild(),
	],
	exports: [
		ResponsiveDatePipe,
		SeperatorDatePipe,
		SafeUrl,
		MaxValuePipe,
		MainMenu,
		UserImageComponent,
		TopicComponent,
		BurstDifferenceComponent,
		SyntaxifyDirective,
		GalleryComponent,
		ChooseFriends,

		HexagonModule,
		CommonModule,
	]
})
export class ComponentsModule { }
