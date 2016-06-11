import {Component} from "angular2/core";

import {SharedComponent} from "./shared.component";
import {IsolatedComponent} from "./isolated.component";
import {IndividualComponent} from "./individual.component";

@Component({
	selector: 'my-app',
	template: `
        <h2>Child injector demo</h2>
            
        <h3>These two child components share same instance</h3>
        <div class="panel">
            <shared class="subpanel"></shared>
            <shared class="subpanel"></shared>
        </div>
        
        <h3>These share same instance, but isolated from the one above</h3>
        <div class="panel">
            <isolated class="subpanel"></isolated>
        </div>

        <h3>These each have their own service instance</h3>
        <div class="panel">
            <individual class="subpanel"></individual>
        </div>

    `,
    directives: [SharedComponent, IsolatedComponent, IndividualComponent]
})
export class AppComponent { }
