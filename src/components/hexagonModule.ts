import { NgModule } from '@angular/core';

import { HexagonComponent } from "./hexagon";

@NgModule({
	declarations: [
		HexagonComponent
	],
	exports: [
		HexagonComponent
	],
})

export class HexagonModule {}