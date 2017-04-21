import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SafeUrl } from "../assets/pipes/safeStyle";
import { ResponsiveDatePipe } from "../assets/pipes/responsiveDate";

import { UserImageComponent } from "./userImage";
import { MainMenu } from "./mainMenu";
import { HexagonModule } from "./hexagonModule";
import { TopicComponent } from "./topicDisplay"
import { SyntaxifyDirective } from "./syntaxify"
import { ChooseFriends } from "./chooseFriends"
import { GalleryComponent } from "./gallery/gallery"

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		SafeUrl,
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
	],
	exports: [
		ResponsiveDatePipe,
		SafeUrl,
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
