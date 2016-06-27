import { bootstrap } from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {AppComponent} from './app.component';
import {EntityService, DialogService} from "./shared/index";

// Routing config must be provided at the top-level, including any
//  guards that might be required, so pull it all into a top-level
//  app route provider, and provide it here
//
import {APP_ROUTER_PROVIDERS} from "./app.routes";

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    EntityService,
    DialogService,
    disableDeprecatedForms(),
    provideForms()
]);
