import Observer from "../asset/observer";
import "jquery";

class ScreenSizeService extends Observer {
	private mobile: boolean = true;
}

export default new ScreenSizeService();
