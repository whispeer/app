import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { SafeUrl } from "../assets/pipes/safeStyle";
import { ResponsiveDatePipe } from "../assets/pipes/responsiveDate";

import { UserImageComponent } from "./userImage";
import { HexagonModule } from "./hexagonModule";
import { MainMenu } from "./mainMenu";

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		SafeUrl,
		MainMenu,
		UserImageComponent,
	],
	imports: [
		HexagonModule,
		BrowserModule,
	]
})
export class ComponentsModule { }
