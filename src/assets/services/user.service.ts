import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { DomSanitizer } from "@angular/platform-browser";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
	topics: any[];

	constructor(private http: Http, private _sanitizer: DomSanitizer) {}

	getUsers = (term?: string): Promise<any[]> => {
		let p: Promise<any[]> = new Promise((resolve) => {
			if(!this.topics) {
				this.http.get("https://randomuser.me/api/?results=20&seed=lolconsistent1337").map(
					(res) => {
						return res.json();
					}
				).map((users: any) => {
					users.results.forEach((user: any) => {
						// this might be an xss hole.
						// info: we have to set the url here, trustedURL is not enought
						// since we cannot add the url in markup.
						user.image = this._sanitizer.bypassSecurityTrustStyle("url(" + user.picture.medium + ")");
						user.name = user.name.first + " " + user.name.last;
					});

					this.topics = users.results;

					resolve(this.topics);
				}).catch((error: Response | any) => {
					console.log(error);

					return Observable.throw(error);
				}).subscribe();
			} else {
				resolve(this.topics);
			}
		});

		if(!term) {
			return p;
		} else {
			return p.then((data: any[]) => {
				return data.filter((elem: any) => {
					return (elem.name.first + " " + elem.name.last).includes(term);
				});
			});
		}
	}
}