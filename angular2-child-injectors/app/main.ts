import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

import {IdService} from "./id.service";

bootstrap(AppComponent, [
    IdService
]);
