import { Injectable } from '@angular/core';
import * as Rx from "rxjs";
import {Store} from "@ngrx/store";

import {ACTIVITY_TIMEOUT_OCCURRED} from "./app.reducer";

import {IState} from "./state.model";

@Injectable()
export class AutoLogoutService {

    constructor(
        store: Store<IState>
    ) { 
        let state$ = store.asObservable() as Rx.Observable<IState>;
        
        state$
            .map((x: IState) => Rx.Observable.Interval(5000))
            //.switch()
            .subscribe((x) => {
                store.dispatch({type: ACTIVITY_TIMEOUT_OCCURRED});
            });
        
    }

}