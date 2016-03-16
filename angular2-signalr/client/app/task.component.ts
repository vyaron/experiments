import {Component, Input} from 'angular2/core';
import Rx from "rxjs/Rx";

import {ApiService} from "./services/api.service";
import {ChannelService, ConnectionState} from "./services/channel.service";
import {Event} from "./models/event.model";

@Component({
    selector: 'task',
    template: `
        <div>
            <h4>Task component bound to '{{eventName}}'</h4>
        </div>
       
        <div>
            <a href="#" *ngIf="!bound" (click)="bind()">Bind</a>
            <a href="#" *ngIf="bound" (click)="unbind()">Unbind</a>
        </div>
    `
})
export class TaskComponent {
    @Input() eventName: string;
    
    bound = false;
    
    private obs: Rx.Observable<any>;
    
    constructor(
        private channelService: ChannelService
    ) {

    }

    bind() {
        this.obs = this.channelService.bind(this.eventName).subscribe(
            (data: any) => { 
                console.log("Event binding", data);
            });
        
        this.bound = true;
    }

    unbind() {
        this.obs.unsubscribe();
        this.bound = false;
    }

}
