import { Pipe, PipeTransform } from "@angular/core"; // tslint:disable-line:no-unused-variable

@Pipe({name: "maxValue"})
export class MaxValuePipe implements PipeTransform {
	transform(value: number, max: number): string {
		if(value > max) {
			return max + "+";
		}
		return value.toString();
	}
}
