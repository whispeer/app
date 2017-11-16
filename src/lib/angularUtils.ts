import { NavController, NavOptions } from "ionic-angular";

export const replaceView = (navCtrl: NavController, view: string, params?, count = 1, options?: NavOptions) => {
	navCtrl.push(view, params, options).then(() => {
		navCtrl.remove(this.navCtrl.length() - count - 1, count)
	})
}
