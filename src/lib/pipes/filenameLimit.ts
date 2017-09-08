import { Pipe, PipeTransform } from "@angular/core"; // tslint:disable-line:no-unused-variable

@Pipe({name: "filenameLimit"})
export class FilenameLimitPipe implements PipeTransform {
	transform(str: string, max: number): string {
		if(str.length > max) {
			let type = str.substring(str.lastIndexOf(".") + 1, str.length);

			return `${str.substring(0, max - type.length - 3)}...${type}`;
		}

		return str;
	}
}
