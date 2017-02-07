import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./login.module";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

platformBrowserDynamic().bootstrapModule(AppModule);
