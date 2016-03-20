import {Component, OnInit, Input} from "angular2/core";
import {Http, Response} from "angular2/http";
import Rx from "rxjs/Rx";

import {ChannelService, ChannelEvent} from "./services/channel.service";

@Component({
    selector: 'admin-channel',
    template: `
        <div>
            <h4>Channel - {{channel}}</h4>
        </div>
    
        <div class="flex-row">
            <textarea 
                class="console flex"
                cols="50" 
                rows="15"
                disabled
                [value]="userMessages"></textarea> 

            <div class="commands flex">
                <textarea 
                    class="console"
                    cols="50" 
                    rows="15"
                    disabled
                    [value]="messages"></textarea> 
                <div class="commands__input flex">
                    <input #message
                        class="flex" 
                        (keyup.enter)="sendMessage(message.value)">
                        <button (click)="sendMessage(message.value)">Send</button>
                </div>
            </div>
        </div>
    `
})
export class AdminChannelComponent implements OnInit {
    @Input() channel: string;

    messages = "";
    userMessages = "";

    private obs: Rx.Observable<ChannelEvent>;

    constructor(
        private http: Http,
        private channelService: ChannelService
    ) {

    }

    ngOnInit() {
        this.obs = this.channelService.sub(this.channel);

        this.obs
            .filter((x: ChannelEvent) => { return x.Name === "broadcast.event"; })
            .subscribe((x: ChannelEvent) => {
                let date = new Date();
                this.messages = date.toLocaleTimeString() + ' : ' + x.ChannelName + " : " + x.Data.message + '\n' + this.messages;
            });

        this.obs
            .filter((x: ChannelEvent) => { return x.Name === "user.connected"; })
            .subscribe((data: any) => {
                let date = new Date();

                this.userMessages = date.toLocaleTimeString() + ': New user - ' + data.ConnectionId + '\n' + this.userMessages;
            });

        this.obs
            .filter((x: ChannelEvent) => { return x.Name === "user.disconnected"; })
            .subscribe((data: any) => {
                let date = new Date();

                this.userMessages = date.toLocaleTimeString() + ': User left - ' + data.ConnectionId + '\n' + this.userMessages;
            });

        this.obs
            .filter((x: ChannelEvent) => { return x.Name == "user.subscribed"; })
            .subscribe((x: any) => {
                let date = new Date();
                this.userMessages = date.toLocaleTimeString() + ': User joined channel ' + x.Data.ChannelName + ' - ' + x.Data.ConnectionId + '\n' + this.userMessages;
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
