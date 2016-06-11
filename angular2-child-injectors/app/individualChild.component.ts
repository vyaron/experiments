import {Component} from "@angular/core";

import {IdService} from "./id.service";

@Component({
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
    `,
    //
    // The only way for these child components to get a new instance of these
    //  service is to configure their own injector to provide it. This ensures
    //  that no parent instance will be used. 
    //
    // However, it also means that this has to be a new component so we can
    //  use a new version of the @Component decorator that includes this 
    //  'providers' parameter.
    //
    providers: [IdService]
})
export class IndividualChildComponent{

    constructor(
        private idService: IdService
    ) {}
}