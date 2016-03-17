import {Component, OnInit} from 'angular2/core';
import Rx from "rxjs/Rx";

import {ChannelService, ConnectionState} from "./services/channel.service";
import {TaskComponent} from "./task.component";

@Component({
    selector: 'my-app',
    template: `
        <div>
            <h3>SignalR w/ Angular 2 demo</h3>
        </div>
       
        <div>
            <span>Connection state: {{connectionState$ | async}}</span>
        </div>
        
        <div>
            <task 
                [apiUrl]="'http://localhost:9123/tasks/long'"
                [eventName]="'longTask.status'">
            </task>
            
            <task 
                [apiUrl]="'http://localhost:9123/tasks/short'"
                [eventName]="'shortTask.status'">
            </task>
        </div>
     `,
     directives: [TaskComponent]
})
export class AppComponent implements OnInit {
    subscribed = false;

    connectionState$: Rx.Observable<string>;

    private channel = "tasks";

    constructor(
        private channelService: ChannelService
    ) {

        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.error("Error:", error); },
            (error: any) => { console.error("errors$ error", error); }
        );
    }

    ngOnInit() {
        this.channelService.start().subscribe(
            () => {
                console.log("signalr service has been started");
            },
            () => { console.error("signalr service failed to start!"); }
        );
    }
}
