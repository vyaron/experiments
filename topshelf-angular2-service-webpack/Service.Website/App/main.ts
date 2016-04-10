/// <reference path="../typings/browser.d.ts"/>

// Polyfills
import "es6-shim";
import "reflect-metadata";
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";

// In a real app only import the specific operators you need
//
import "rxjs";

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent);
