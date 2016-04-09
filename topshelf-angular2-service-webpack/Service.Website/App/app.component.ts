import {Component} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from "angular2/http";

@Component({
    selector: 'my-app',
    template: `
        <h1>Making an API call</h1>
        <button (click)="callApi()">Get Current Time</button>    
        <div>
            Here's the current time: {{currentTime}}
        </div>
    `,
    providers: [HTTP_PROVIDERS]
})
export class AppComponent {

    /**
     * The current time returned from the API
     */
    currentTime: string;

    /**
     * Makes a call to the self-hosted API to get the current time
     */
    callApi(): void {
        this.http.get("/api/time")
            .subscribe(
            (response: Response) => {
                this.currentTime = response.json();
            });
    }


    constructor(
        private http: Http
    )
    { }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/