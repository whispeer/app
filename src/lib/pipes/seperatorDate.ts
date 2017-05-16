import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

const translateKeys = ["today", "tomorrow"]

@Pipe({
	name: "seperatorDate"
})
export class SeperatorDatePipe {

	constructor(private datePipe: DatePipe, private translate: TranslateService) {}

	transform(value: any): string {
		if(!value) {
			return "";
		}

		if(typeof value === "number") {
			value = new Date(value);
		}

		const momentValue = moment(value)

		const formatted = momentValue.format("Do MMMM YYYY")

		const dayDiff = moment().diff(momentValue, "days")

		if (dayDiff > 1) {
			return `${formatted}`
		}

		const dayDiffString = this.translate.instant(`time.${translateKeys[dayDiff]}`);

		return `${dayDiffString}, ${formatted}`
	}
}
