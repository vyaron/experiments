import {Component} from "angular2/core";

import {ChildComponent} from "./child.component";

@Component({
	selector: 'my-app',
    style: `
        .children: {
            display: flex;
            flex-direction: column;
        }
    `,
	template: `
        <h2>Child injector demo</h2>
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
export class AppComponent { }
