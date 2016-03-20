import {Component, OnInit, Input} from "angular2/core";
import {Http, Response} from "angular2/http";
import Rx from "rxjs/Rx";

import {ChannelService, ChannelEvent} from "./services/channel.service";

@Component({
    selector: 'channel',
    template: `
        <div>
            <h4>Channel - {{channel}}</h4>
        </div>
    
        <div class="commands">
            <textarea 
                class="console"
                cols="50" 
                rows="15"
                disabled
                [value]="messages"></textarea> 
                
            <div class="commands__input">
                <input #message
                    class="flex" 
                    (keyup.enter)="sendMessage(message.value)">
                    <button (click)="sendMessage(message.value)">Send</button>
            </div>
        </div>
    `
})
export class ChannelComponent implements OnInit {
    @Input() channel: string;

    messages = "";

    private obs: Rx.Observable<ChannelEvent>;

    constructor(
        private http: Http,
        private channelService: ChannelService
    ) {

    }

    ngOnInit() {
        // Get an observable for events emitted on this channel
        //
        this.obs = this.channelService.sub(this.channel);

        // Set up the code to run when the 'braodcast.event' event is emitted
        //  on the stream (i.e., on the channel associated with this component)
        //
        this.obs
            .filter((x: ChannelEvent) => { return x.Name === "broadcast.event"; })
            .subscribe((x: ChannelEvent) => {
                // Just prepend this to the messages string shown in the textarea
                //
                let date = new Date();
                this.messages = date.toLocaleTimeString() + ': ' + x.Data.message + '\n' + this.messages;
            });

    }

    sendMessage(message: string) {
        let ev = new ChannelEvent();
        ev.ChannelName = this.channel;
        ev.Name = "broadcast.event";
        ev.Data = { message: message };

        this.channelService.publish(ev);
    }
}
