import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
	topics: any[];

	constructor(private http: Http) {}

	getUsers = (term?: string): Promise<any[]> => {
		let p: Promise<any[]> = new Promise((resolve) => {
			if(!this.topics) {
				this.http.get("https://randomuser.me/api/?results=20&seed=lolconsistent1337").map(
					(res) => {
						return res.json();
					}
				).map((users: any) => {
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