import {Component} from "angular2/core";

import {ChildComponent} from "./child.component";

@Component({
	selector: 'shared',
	template: `
        <div class="children">
            <child></child>
            <child></child>
            <child></child>
            <child></child>
            <child></child>
        </div>
    `,
    directives: [ChildComponent]
})
export class SharedComponent { }
