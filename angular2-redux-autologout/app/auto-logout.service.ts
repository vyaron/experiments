import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {IState} from "./state.model";

@Injectable()
export class AutoLogoutService {

    constructor(
        state: Store<IState>
    ) { 
        
        
    }

}