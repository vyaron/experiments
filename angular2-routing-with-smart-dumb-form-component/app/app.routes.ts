import {RouterConfig, provideRouter} from "@angular/router";

// We need to import the 'index' files directly because typescript
//  is using node-based modules, but systemjs doesn't 
//  http://stackoverflow.com/a/36583422/571237
//
import {HomeComponent} from "./home/index";
import {ListComponent} from "./list/index";
import {AddComponent} from "./add/index";
import {EditComponent} from "./edit/index";
import {ViewComponent} from "./view/index";
import {CanDeactivateGuard} from "./shared/index";

export const AppRoutes: RouterConfig = [
  { path: 'home', component: HomeComponent },
  {
    path: 'list', component: ListComponent, children: [
      { path: 'add', component: AddComponent, canDeactivate: [CanDeactivateGuard] },
      { path: ':id/edit', component: EditComponent, canDeactivate: [CanDeactivateGuard] },
      { path: ':id', component: ViewComponent },
      { path: '', component: ViewComponent }
    ]
  },
  { path: '', redirectTo: '/home', terminal: true }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(AppRoutes),
  CanDeactivateGuard
];