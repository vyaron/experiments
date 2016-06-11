import {Component} from "angular2/core";

import {IdService} from "./id.service";
import {ChildComponent} from "./child.component";

@Component({
	selector: 'isolated',
	template: `
        <div class="children">
            <child></child>
            <child></child>
            <child></child>
            <child></child>
            <child></child>
        </div>
    `,
    directives: [ChildComponent],
    //
    // We define the provider here so that all child components get
    //  a new instance of the IdService
    //
    providers: [IdService]
})
export class IsolatedComponent { }
