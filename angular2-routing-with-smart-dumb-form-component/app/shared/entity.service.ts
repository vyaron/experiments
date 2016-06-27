import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";

import {Entity} from './index';

@Injectable()
export class EntityService {
    entities: Entity[];

    constructor() { 
        this.entities = [
            {id: 1, stringValue: 'Entity one', numberValue: 1},
            {id: 2, stringValue: 'Entity two', numberValue: 2},
            {id: 3, stringValue: 'Entity three', numberValue: 3},
            {id: 4, stringValue: 'Entity four', numberValue: 4},
            {id: 5, stringValue: 'Entity five', numberValue: 5},
            {id: 6, stringValue: 'Entity six', numberValue: 6}
        ];
    }

}