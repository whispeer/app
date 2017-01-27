import { Component } from "@angular/core";
import { Http, Response} from "@angular/http";

import { Observable } from 'rxjs/Observable';

import { NavController } from "ionic-angular";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',

})
export class HomePage {
	users: any[] = [];
	constructor(public navCtrl: NavController, private http: Http) {}

	ngOnInit() { this.getUsers(); }

	getUsers = () => {
		this.http.get("https://randomuser.me/api/?results=20").map(
			(res) => {
				return res.json();
			}
		).map((users: any) => {
			users.results.forEach((user: any) => {
				this.users.push(user);
			});
		}).catch((error: Response | any) => {
			console.log(error);

			return Observable.throw(error);
		}).subscribe();
	}

}
