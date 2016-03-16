import {Component} from "angular2/core";

import {IdService} from "./id.service";

@Component( {
    selector: 'child',
    style: `
        .child: {
            display: flex;
            flex-direction: row;
        }
    `,
    template: `
        <div class="child">
            <a href="#" (click)="idService.regenerate()">Regenerate</a>
            <span>{{idService.id}}</span>
        </div>
    `
})
export class ChildComponent {
    
    constructor(
        private idService: IdService
    )
    {}
}