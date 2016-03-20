import {Component, OnInit} from 'angular2/core';
import Rx from "rxjs/Rx";

import {ChannelService, ConnectionState} from "./services/channel.service";
import {ChannelComponent} from "./channel.component";
import {AdminChannelComponent} from "./adminChannel.component";

@Component({
    selector: 'my-app',
    template: `
        <div>
            <h3>SignalR w/ Angular 2 demo</h3>
        </div>
       
        <div>
            <span>Connection state: {{connectionState$ | async}}</span>
        </div>
        
        <div class="flex-row">
            <admin-channel class="flex"
                [channel]="'admin'"></admin-channel>
        </div>
        <div class="flex-row">
            <channel class="flex"
                [channel]="'one'"></channel>
            <channel class="flex"
                [channel]="'two'"></channel>
        </div>

     `,
    directives: [AdminChannelComponent, ChannelComponent]
})
export class AppComponent implements OnInit {

    // An internal "copy" of the connection state stream used because
    //  we want to map the values of the original stream. If we didn't 
    //  need to do that then we could use the service's observable 
    //  right in the template.
    //   
    connectionState$: Rx.Observable<string>;

    constructor(
        private channelService: ChannelService
    ) {

        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.error(error); },
            (error: any) => { console.error("errors$ error", error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.error("signalr service failed to start!"); }
        );
    }

    ngOnInit() {
        // Start the connection up!
        //
        console.log("Starting the channel service");

        this.channelService.start();
    }
}
