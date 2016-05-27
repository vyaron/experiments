import { bootstrap }    from '@angular/platform-browser-dynamic';

import {provideStore} from "@ngrx/store";
import {appReducer} from "./app.reducer";
import {initialState} from "./state.model";

import { AppComponent } from './app.component';

bootstrap(AppComponent, [
    provideStore(appReducer, initialState)
]);
