import {Component} from "@angular/core";

import {IdService} from "./id.service";

@Component( {
    selector: 'child',
     styles: [`
        span {
            margin-left: 10px;
            margin-right: 10px;
        }
    `],
   template: `
        <span><a href="#" (click)="idService.regenerate()">Regenerate</a></span>
        <span>{{idService.id}}</span>
    `
})
export class ChildComponent {
    
    constructor(
        //
        // Here we indicate we need an instance of IdService injected, but
        //  since we're not "providing" it within this component, Angular
        //  will walk up the injector tree finding something that can
        //  
        private idService: IdService
    ) {}
}