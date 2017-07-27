import Observer from "../asset/observer";
import "jquery";

class ScreenSizeService extends Observer {
	mobile: true
}

export default new ScreenSizeService();
