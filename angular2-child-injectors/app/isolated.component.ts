import {Component} from "@angular/core";

import {IdService} from "./id.service";
import {ChildComponent} from "./child.component";

@Component({
	selector: 'isolated',
	template: `
        <child></child>
        <child></child>
        <child></child>
        <child></child>
    `,
    directives: [ChildComponent],
    //
    // We don't want any children of this component to use the top-level
    //  instance of IdService, so we configure its injector to provide
    //  a new instance here. Note, this is still going to be a singleton
    //  so any children using this will share the same instance.
    //
    providers: [IdService]
})
export class IsolatedComponent { }
