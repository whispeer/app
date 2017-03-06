import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
	name: "responsiveDate"
})
export class ResponsiveDatePipe {

	constructor(private datePipe: DatePipe) {}

	transform(value: any): string {
		if(!value) {
			return "";
		}

		if(typeof value === "number") {
			value = new Date(value);
		}

		let format: string;

		let now: Date = new Date;
		now.setHours(0, 0, 0, 0);

		let date_norm: Date = new Date(value);
		date_norm.setHours(0, 0, 0, 0);

		const diff_norm: number = (now.getTime() - date_norm.getTime()) / 1000;

		if(diff_norm === 0) { // same day
			format = "HH:mm";
		} else if(diff_norm <= 86400) {
			return "Yesterday"; // TODO: localize!!
		} else if(diff_norm <= 518400) {
			format = "EEEE";
		} else {
			format = "dd.MM.y"
		}

		return this.datePipe.transform(value, format);
	}
}