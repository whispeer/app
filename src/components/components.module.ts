import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ResponsiveDatePipe } from "../lib/pipes/responsiveDate";
import { MaxValuePipe } from "../lib/pipes/maxValue";
import { FilenameLimitPipe } from "../lib/pipes/filenameLimit";

import { UserImageComponent } from "./userImage";
import { MainMenu } from "./mainMenu";
import { ChooseFriends } from "./chooseFriends"
import { LoadComponent } from "./load"
import { LoadingProgress } from "./loadingProgress"

import { HexagonComponent } from "./hexagon";
import { MainMenuHexagon } from "./mainMenuHexagon";
import { MainMenuIcon} from "./mainMenuIcon";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		MaxValuePipe,
		FilenameLimitPipe,
		MainMenu,
		UserImageComponent,
		ChooseFriends,
		LoadComponent,
		LoadingProgress,
		HexagonComponent,
		MainMenuHexagon,
		MainMenuIcon
	],
	imports: [
		IonicModule,
		CommonModule,
		TranslateModule.forChild()
	],
	exports: [
		ResponsiveDatePipe,
		MaxValuePipe,
		FilenameLimitPipe,
		MainMenu,
		UserImageComponent,
		ChooseFriends,
		LoadComponent,
		LoadingProgress,
		HexagonComponent,
		MainMenuHexagon,
		MainMenuIcon,
		CommonModule,
	]
})
export class ComponentsModule { }
