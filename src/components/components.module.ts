import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ResponsiveDatePipe } from "../lib/pipes/responsiveDate";
import { MaxValuePipe } from "../lib/pipes/maxValue";
import { FilenameLimitPipe } from "../lib/pipes/filenameLimit";

import { UserImageComponent } from "./userImage";
import { Navigator } from "./navigator/navigator";
import { LoadComponent } from "./load"
import { LoadingProgress } from "./loadingProgress"

import { HexagonComponent } from "./hexagon";
import { NavigatorHexagon } from "./navigator/hexagon";
import { NavigatorIcon } from "./navigator/icon";

import { UsernameComponent } from "./username"

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ResponsiveDatePipe,
		MaxValuePipe,
		FilenameLimitPipe,
		UserImageComponent,
		LoadComponent,
		LoadingProgress,
		HexagonComponent,
		Navigator,
		NavigatorHexagon,
		NavigatorIcon,
		UsernameComponent,
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
		UserImageComponent,
		LoadComponent,
		LoadingProgress,
		HexagonComponent,
		CommonModule,
		Navigator,
		NavigatorHexagon,
		NavigatorIcon,
		UsernameComponent,
	]
})
export class ComponentsModule { }
