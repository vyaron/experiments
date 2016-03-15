import {provide, APP_INITIALIZER} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from "angular2/http";

import {AppComponent} from './app.component';

import {ApiGateway} from "./apiGateway.service";
import {FriendService} from "./friend.service";
import {HttpErrorHandler} from "./HttpErrorHandler";

document.cookie = "XSRF-TOKEN=Dont-Tase-Me-Bro";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ApiGateway,
    FriendService,
    HttpErrorHandler,
    //
    // Make sure our "unused" services are created via the
    //  APP_INITIALIZER token
    //
    provide(APP_INITIALIZER, {
        useFactory: (httpErrorHandler) => {
            console.info( "HttpErrorHandler initialized." );
        },
        deps: [HttpErrorHandler]
    })
]);
