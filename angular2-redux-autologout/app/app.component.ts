import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {INCREMENT, DECREMENT, RESET, USER_LOGGED_IN, USER_LOGGED_OUT} from "./app.reducer";
import {IState} from "./state.model";

@Component({
    selector: 'my-app',
    styles: [`
    .flex-col {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    
        .flex-row {
        display: flex;
        flex-direction: row;
    }

  `],
    template: `
    <div class="flex-col">
        <span>Counter: {{counter$ | async}}</span>
        
        <div class="flex-row">
            <button (click)="decrement()">Decrement</button>
            <button (click)="reset()">Reset</button>
            <button (click)="increment()">Increment</button>
        </div>
    </div>
    
    <div *ngIf="!(loggedIn$ | async)" class="flex-col">
        <span>There is no user logged in</span>
        <div class="flex-row">
            <button (click)="login()">Login</button>
        </div>
    </div>

    <div *ngIf="(loggedIn$ | async)" class="flex-col">
        <span>You are logged in</span>
        <div class="flex-row">
            <button (click)="logout()">Log out</button>
        </div>
    </div>
  `
})
export class AppComponent {
    counter$: Observable<number>;
    loggedIn$: Observable<boolean>;

    constructor(
        private store: Store<IState>
    ) {

        this.counter$ = store.select("counter");
        this.loggedIn$ = store.select("loggedIn");

    }

    decrement() {
        this.store.dispatch({ type: DECREMENT });
    }
    reset() {
        this.store.dispatch({ type: RESET });
    }
    increment() {
        this.store.dispatch({ type: INCREMENT });
    }
    
    login() {
        this.store.dispatch({ type: USER_LOGGED_IN });
    }
    
    logout() {
        this.store.dispatch({ type: USER_LOGGED_OUT });
    }
}
