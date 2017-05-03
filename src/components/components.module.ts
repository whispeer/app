import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SafeUrl } from "../lib/pipes/safeStyle";
import { ResponsiveDatePipe } from "../lib/pipes/responsiveDate";
import { MaxValuePipe } from "../lib/pipes/maxValue";

import { UserImageComponent } from "./userImage";
import { MainMenu } from "./mainMenu";
import { HexagonModule } from "./hexagonModule";
import { TopicComponent } from "./topicDisplay"
import { SyntaxifyDirective } from "./syntaxify"
import { ChooseFriends } from "./chooseFriends"
import { GalleryComponent } from "./gallery/gallery"

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		SafeUrl,
		MaxValuePipe,
		MainMenu,
		UserImageComponent,
		TopicComponent,
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
		SafeUrl,
		MaxValuePipe,
		MainMenu,
		UserImageComponent,
		TopicComponent,
		SyntaxifyDirective,
		GalleryComponent,
		ChooseFriends,

		HexagonModule,
		CommonModule,
	]
})
export class ComponentsModule { }
