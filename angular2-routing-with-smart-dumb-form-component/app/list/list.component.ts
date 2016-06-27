import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {EntityService} from '../shared/index';

@Component({
    moduleId: module.id,
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
    constructor(
        private entityService: EntityService
    ) { }

    ngOnInit() { }

}