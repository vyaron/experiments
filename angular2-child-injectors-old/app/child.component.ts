import {Component} from "angular2/core";

import {IdService} from "./id.service";

@Component( {
    selector: 'child',
    template: `
        <div class="child">
            <span><a href="#" (click)="idService.regenerate()">Regenerate</a></span>
            <span>{{idService.id}}</span>
        </div>
    `
})
export class ChildComponent {
    
    constructor(
        protected idService: IdService
    )
    {}
}