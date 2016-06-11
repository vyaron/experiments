import {Component} from "@angular/core";

import {ChildComponent} from "./child.component";

@Component({
	selector: 'shared',
	template: `
        <child></child>
        <child></child>
        <child></child>
        <child></child>
    `,
    directives: [ChildComponent]
})
export class SharedComponent { }
