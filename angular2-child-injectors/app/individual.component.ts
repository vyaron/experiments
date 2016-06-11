import {Component, provide} from "@angular/core";

import {IdService} from "./id.service";
import {IndividualChildComponent} from "./individualChild.component";

@Component({
	selector: 'individual',
	template: `
        <child></child>
        <child></child>
        <child></child>
        <child></child>
    `,
    directives: [IndividualChildComponent]
})
export class IndividualComponent { }
