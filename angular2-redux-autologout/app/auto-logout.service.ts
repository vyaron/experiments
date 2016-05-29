import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {ACTIVITY_TIMEOUT_OCCURRED} from "./app.reducer";

import {IState} from "./state.model";

@Injectable()
export class AutoLogoutService {

    constructor(
        store: Store<IState>
    ) { 
        let state$ = store.asObservable() as Observable<IState>;
        
        state$
            .filter((x: IState) => x.loggedIn)
            .map((x: IState) => Observable.interval(5000))
            .do((x: any) => console.log("Activity detected! Timer has reset"))
            .switch()
            .subscribe((x) => {
                console.log("Inactivity interval expired! Dispatching timeout event")
                store.dispatch({type: ACTIVITY_TIMEOUT_OCCURRED});
            });
        
    }

}