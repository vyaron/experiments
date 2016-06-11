import {Component, provide} from "angular2/core";

import {IdService} from "./id.service";
import {IndividualChildComponent} from "./individualChild.component";

@Component({
	selector: 'individual',
	template: `
        <div class="children">
            <child></child>
            <child></child>
            <child></child>
            <child></child>
            <child></child>
        </div>
    `,
    directives: [IndividualChildComponent],
    //
    // Define a factory for creating new instances of IdService so
    //  so that each child component will get a brand new instances
    //
    providers: [
        provide(IdService, { useFactory: () => {
            return () => {
                return new IdService();
            }
        }})
    ]
})
export class IndividualComponent { }
