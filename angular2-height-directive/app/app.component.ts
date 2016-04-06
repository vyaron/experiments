import {Component} from 'angular2/core';

@Component({
	selector: 'my-app',
	template: `
        <div class="panel">
            <div class="small">
                <span>
                    Small
                </span>
            </div>
        </div>
        <div class="panel">
            <div class="large">
                <span>
                    Large
                </span>
            </div>
        </div>    
    `
})
export class AppComponent { }

