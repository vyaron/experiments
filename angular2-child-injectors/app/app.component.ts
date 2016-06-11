import {Component} from "@angular/core";

import {IdService} from "./id.service";
import {SharedComponent} from "./shared.component";
import {IsolatedComponent} from "./isolated.component";
import {IndividualComponent} from "./individual.component";

@Component({
	selector: 'my-app',
    styles: [`        
        .subpanel {
            font-family: "Courier New", Courier, monospace;
            font-size: 0.9em;
            display: flex;
            flex-direction: column;
            margin: 20px;
            padding: 10px;
        }    
    `],
	template: `
        <h2>Angular 2 Dependency Injection demo</h2>
            
        <h3>These two child components share same service instance</h3>
        <shared class="subpanel"></shared>
        <shared class="subpanel"></shared>
        
        <h3>These share same instance, but isolated from the one above</h3>
        <isolated class="subpanel"></isolated>

        <h3>These each have their own service instance</h3>
        <individual class="subpanel"></individual>

    `,
    directives: [SharedComponent, IsolatedComponent, IndividualComponent],
    //
    // We provide the IdService in the AppComponent's injector so that any
    //  child component can get it, but it will be a single application-wide
    //  instance if this is the one used
    //
    providers: [IdService]
})
export class AppComponent { }
