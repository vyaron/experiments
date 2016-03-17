import {Component, Input} from "angular2/core";
import {Http, Response} from "angular2/http";
import Rx from "rxjs/Rx";

import {ChannelService, ConnectionState} from "./services/channel.service";

class StatusEvent {
    State: string;
    PercentComplete: number;
}

@Component({
    selector: 'task',
    template: `
        <div>
            <h4>Task component bound to '{{eventName}}'</h4>
        </div>
    
        <div>
            <a href="#" (click)="callApi()">Call API</a>
        </div>
   
        <div>
            <a href="#" *ngIf="!bound" (click)="bind()">Bind</a>
            <a href="#" *ngIf="bound" (click)="unbind()">Unbind</a>
        </div>
    `
})
export class TaskComponent {
    @Input() eventName: string;
    @Input() apiUrl: string;
    
    bound = false;
    
    private obs: Rx.Observable<any>;
    
    constructor(
        private http: Http,
        private channelService: ChannelService
    ) {

    }

    bind() {
        this.obs = this.channelService.bind(this.eventName).subscribe(
            (data: StatusEvent) => { 
                console.log("Event binding", data);
            });
        
        this.bound = true;
    }

    unbind() {
        this.obs.unsubscribe();
        this.bound = false;
    }

    callApi() {
        this.http.get(this.apiUrl)
            .map((res: Response) => res.json())
            .subscribe((message: string) => {console.log(message);});
    }
}
