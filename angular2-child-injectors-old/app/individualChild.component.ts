import {Component} from "angular2/core";

import {IdService} from "./id.service";
import {ChildComponent} from "./child.component";

@Component({
    selector: 'child',
    template: `
        <div class="child">
            <span><a href="#" (click)="idService.regenerate()">Regenerate</a></span>
            <span>{{idService.id}}</span>
        </div>
    `,
    providers: [IdService]
})
export class IndividualChildComponent extends ChildComponent {

    constructor(
        idService: IdService
    ) {
        super(idService);
    }
}