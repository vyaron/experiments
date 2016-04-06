import {Component} from 'angular2/core';

import {HeightDirective} from "./height.directive";

@Component({
	selector: 'my-app',
    directives: [HeightDirective],
	template: `
        <div class="panel">
            <div class="small" myHeight (resize)="smallHeight = $event">
                <span>
                    {{smallHeight}}
                </span>
            </div>
        </div>
        <div class="panel">
            <div class="large" myHeight (resize)="largeHeight = $event">
                <span>
                    {{largeHeight}}
                </span>
            </div>
        </div>    
    `
})
export class AppComponent { 
    smallHeight: number;
    largeHeight: number;    
}

