import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";

import { SafeUrl } from "../assets/pipes/safeStyle";
import { ResponsiveDatePipe } from "../assets/pipes/responsiveDate";

import { UserImageComponent } from "./userImage";
import { MainMenu } from "./mainMenu";
import { HexagonModule } from "./hexagonModule";
import { TopicComponent } from "./topicDisplay"
import { SyntaxifyDirective } from "./syntaxify"
import { ChooseFriends } from "./chooseFriends"
import { GalleryComponent } from "./gallery/gallery"

const declarations: any[] = [
	ResponsiveDatePipe,
	SafeUrl,
	MainMenu,
	UserImageComponent,
	TopicComponent,
	SyntaxifyDirective,
	GalleryComponent,
	ChooseFriends,
]

@NgModule({
	declarations: declarations,
	imports: [
		HexagonModule,
		QRCodeModule,
		IonicModule,
		CommonModule,
	],
	exports: declarations.concat([
		HexagonModule,
		QRCodeModule,
		CommonModule,
	])
})
export class ComponentsModule { }
