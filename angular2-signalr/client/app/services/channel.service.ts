import {Injectable, Inject} from "angular2/core";
import Rx from "rxjs/Rx";

import {ChannelEvent} from "../models/channelEvent.model";

// Just to get around typescript warnings
//
declare var $: any;

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}

export class ChannelConfig {
    url: string;
    hubName: string;
    channel: string;
}

class EventObservable {
    event: string;
    observable: Rx.Observable<any>;
}

@Injectable()
export class ChannelService {

    // Public interface
    //
    connectionState$: Rx.Observable<ConnectionState>;
    error$: Rx.Observable<string>;

    private connectionStateSubject = new Rx.Subject<ConnectionState>();
    private errorSubject = new Rx.Subject<any>();
    private eventSubject = new Rx.Subject<ChannelEvent>();
    private event$: Rx.Observable<ChannelEvent>;
    
    private hubConnection: any;
    private hubProxy: any;
    private channel: string;
    
    private observables = new Array<EventObservable>();
    
    constructor(
        @Inject("channel.config") private channelConfig: ChannelConfig
    ) {

        // TODO: Validate that signalR is properly defined
        //

        // Set up our observables
        //
        this.connectionState$ = this.connectionStateSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();

        this.event$ = this.eventSubject.asObservable();
        this.hubConnection = $.hubConnection();
        this.hubConnection.url = channelConfig.url;
        this.channel = channelConfig.channel;
        this.hubProxy = this.hubConnection.createHubProxy(channelConfig.hubName);
        
        // Define handlers for the connection state events
        //
        this.hubConnection.stateChanged((state: any) => {
            let newState = ConnectionState.Connecting;

            switch (state.newState) {
                case $.signalR.connectionState.connecting:
                    newState = ConnectionState.Connecting;
                    break;
                case $.signalR.connectionState.connected:
                    newState = ConnectionState.Connected;
                    break;
                case $.signalR.connectionState.reconnecting:
                    newState = ConnectionState.Reconnecting;
                    break;
                case $.signalR.connectionState.disconnected:
                    newState = ConnectionState.Disconnected;
                    break;
            }

            // Push the new state on our subject
            //
            this.connectionStateSubject.next(newState);
        });

        // Define handlers for any errors
        //
        this.hubConnection.error((error: any) => {
            // Push the error on our subject
            //
            this.errorSubject.next(error);
        });

        this.hubProxy.on("onEvent", (ev: ChannelEvent) => {
            this.eventSubject.next(ev);
        })
    }

    /** Open the connection and return an observable for the state of the process */
    start(): Rx.Observable<string> {
        let promise = this.hubConnection.start()
            .done(() => {
                this.hubProxy.invoke("Subscribe", this.channel);
            });
            
        return Rx.Observable.fromPromise(promise);
    }

    /** Get an observable that will contain the data associated with a specific event */
    bind(eventName: string): Rx.Observable<any> {
        // If we already have a subject for this event, then just return it
        //
        let evObs = this.observables.find((x: EventObservable) => {
            return x.event == eventName;
        }) as EventObservable;
        
        if(evObs === undefined) {
            let obs = this.event$
                .filter((x: ChannelEvent) => { return x.Name == eventName;})
                .map((x: ChannelEvent) => { return JSON.parse(x.Json); });
            
            evObs = new EventObservable();
            evObs.event = eventName;
            evObs.observable = obs;
            
            this.observables.push(evObs);
        }
        
        return evObs.observable;
    }
    
    unbind(eventName: string): Rx.Observable<any> {
        this.observables = this.observables.filter((x: EventObservable) => {
            return x.event === eventName;
        });
    }

}