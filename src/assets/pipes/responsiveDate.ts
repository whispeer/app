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
		let now: Date =  new Date;
		now.setHours(0, 0, 0, 0);
		const diff: number = (now.getTime() - value.getTime()) / 1000;

		if(diff < 86400) {
			format = "HH:mm";
		} else if(diff < 172800) {
			return "Yesterday"; // TODO: localize!!
		} else if(diff < 518400) {
			format = "EEEE";
		} else {
			format = "dd.MM.y"
		}

		return this.datePipe.transform(value, format);
	}
}