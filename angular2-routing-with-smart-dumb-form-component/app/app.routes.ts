import {RouterConfig, provideRouter} from "@angular/router";

// We need to import the 'index' files directly because typescript
//  is using node-based modules, but systemjs doesn't 
//  http://stackoverflow.com/a/36583422/571237
//
import {HomeComponent} from "./home/index";
import {AddComponent} from "./add/index";
import {CanDeactivateGuard} from "./shared/index";

export const AppRoutes: RouterConfig = [
  { path: 'home',  component: HomeComponent },
  { path: 'add', component: AddComponent, canDeactivate: [CanDeactivateGuard] },
  { path: '', redirectTo: '/home', terminal: true}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(AppRoutes),
  CanDeactivateGuard
];