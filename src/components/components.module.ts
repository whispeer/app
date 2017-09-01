import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ResponsiveDatePipe } from "../lib/pipes/responsiveDate";
import { MaxValuePipe } from "../lib/pipes/maxValue";
import { LimitPipe } from "../lib/pipes/limit";

import { UserImageComponent } from "./userImage";
import { MainMenu } from "./mainMenu";
import { ChooseFriends } from "./chooseFriends"
import { LoadComponent } from "./load"
import { LoadingProgress } from "./loadingProgress"

import { HexagonModule } from "./hexagonModule";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		MaxValuePipe,
		LimitPipe,
		MainMenu,
		UserImageComponent,
		ChooseFriends,
		LoadComponent,
		LoadingProgress,
	],
	imports: [
		HexagonModule,
		IonicModule,
		CommonModule,
		TranslateModule.forChild(),
	],
	exports: [
		ResponsiveDatePipe,
		MaxValuePipe,
		LimitPipe,
		MainMenu,
		UserImageComponent,
		ChooseFriends,
		LoadComponent,
		LoadingProgress,

		HexagonModule,
		CommonModule,
	]
})
export class ComponentsModule { }
