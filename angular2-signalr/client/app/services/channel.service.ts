import {Injectable, Inject} from "angular2/core";
import Rx from "rxjs/Rx";

/**
 * When SignalR runs it will add functions to the global $ variable 
 * that you use to create connections to the hub. However, in this
 * class we won't want to depend on any global variables, so this
 * class provides an abstraction away from using $ directly in here.
 */
export class SignalrWindow extends Window {
    $: any;
}

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

export class ChannelEvent {
    Name: string;
    ChannelName: string;
    Timestamp: Date;
    Data: any;
    Json: string;

    constructor() {
        this.Timestamp = new Date();
    }
}

class ChannelObservable {
    channel: string;
    observable: Rx.Observable<ChannelEvent>;
}

/**
 * ChannelService is a wrapper around the functionality that SignalR
 * provides to expose the ideas of channels and events. With this service
 * you can subscribe to specific channels (or groups in signalr speak) and
 * use observables to react to specific events sent out on those channels.
 */
@Injectable()
export class ChannelService {

    /**
     * starting$ is an observable available to know if the signalr 
     * connection is ready or not. On a successful connection this
     * stream will emit a value.
     */
    starting$: Rx.Observable<any>;
    
    /**
     * connectionState$ provides the current state of the underlying
     * connection as an observable stream.
     */
    connectionState$: Rx.Observable<ConnectionState>;
    
    /**
     * error$ provides a stream of any error messages that occur on the 
     * SignalR connection
     */
    error$: Rx.Observable<string>;

    // These are used to feed the public observables 
    //
    private connectionStateSubject = new Rx.Subject<ConnectionState>();
    private startingSubject = new Rx.Subject<any>();
    private errorSubject = new Rx.Subject<any>();
    
    // These are used internally to push out events that are received 
    //  on the appropriate observables 
    //
    private eventSubject = new Rx.Subject<any>();
    private event$: Rx.Observable<ChannelEvent>;

    // These are used to track the internal SignalR state 
    //
    private hubConnection: any;
    private hubProxy: any;

    // An internal array to track what channel subscriptions exist 
    //
    private observables = new Array<ChannelObservable>();

    constructor(
        @Inject(SignalrWindow) private window: SignalrWindow,
        @Inject("channel.config") private channelConfig: ChannelConfig
    ) {
        // Set up our observables
        //
        this.connectionState$ = this.connectionStateSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();
        this.starting$ = this.startingSubject.asObservable();

        this.event$ = this.eventSubject.asObservable();
        this.hubConnection = this.window.$.hubConnection();
        this.hubConnection.url = channelConfig.url;
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

        this.hubProxy.on("onEvent", (channel: string, ev: ChannelEvent) => {
            //console.log(`onEvent - ${channel} channel`, ev);

            this.eventSubject.next({channel: channel, channelEvent: ev});
        });

    }

    /**
     * Start the SignalR connection. The starting$ stream will emit an 
     * event if the connection is established, otherwise it will emit an
     * error.
     */
    start(): void {
        // Now we only want the connection started once, so we have a special
        //  starting$ observable that clients can subscribe to know know if
        //  if the startup sequence is done.
        //
        // If we just mapped the start() promise to an observable, then any time
        //  a client subscried to it the start sequence would be triggered
        //  again since it's a cold observable.
        //
        this.hubConnection.start()
            .done(() => {
                this.startingSubject.next();
            })
            .fail((error: any) => {
                this.startingSubject.error(error);
            });
    }

    /** Get an observable that will contain the data associated with a specific channel */
    sub(channel: string): Rx.Observable<ChannelEvent> {

        // Try to find an observable that we already created for the requested 
        //  channel
        //
        let channelObs = this.observables.find((x: ChannelObservable) => {
            return x.channel === channel;
        }) as ChannelObservable;

        // If we already have one for this event, then just return it
        //
        if (channelObs !== undefined) {
            console.log(`Found existing observable for ${channel} channel`)
            return channelObs.observable;
        }

        //
        // If we're here then we don't already have the observable to provide the
        //  caller, so we need to call the server method to join the channel 
        //  and then create an observable that the caller can use to received
        //  messages.
        //
        
        // Now SignalR is asynchronous, so we need to ensure the connection is
        //  established before we call any server methods. So we'll subscribe to 
        //  the starting$ stream since that won't emit a value until the connection
        //  is ready
        //
        this.starting$.subscribe(() => {
            this.hubProxy.invoke("Subscribe", channel)
                .done(() => {
                    console.log(`Successfully subscribed to ${channel} channel`);
                })
                .fail((error: any) => {
                    console.log(`Failed to subscribe to ${channel} channel`, error);
                    this.errorSubject.next(error);
                });
        },
        () => {
            console.warn("Failed to subscribe to channel because service is not running");
        });
        
        // This works by creating a new observable that observes the incoming
        //  event$ stream. However, this observable should only emit events on
        //  a particular channel, so we add a filter here to ensure that's only 
        //  what is passed on to subscribers.
        //
        // We also map the result so only the event object itself is provided.
        //  This is because the caller already specified what channel this is for
        //  so they are expecting to get ChannelEvent objects.
        //
        let obs = this.event$
            .filter((x: any) => { return x.channel === channel; })
            .map((x: any) => { return x.channelEvent;});

        // Now we just create our internal object so we can track this observable
        //  in case someone else wants it too
        //
        channelObs = new ChannelObservable();
        channelObs.channel = channel;
        channelObs.observable = obs;
        this.observables.push(channelObs);

        console.log(`Created new observable for ${channel} channel`)

        return obs;
    }

    // Not quite sure how to handle this (if at all) since there could be
    //  more than 1 caller subscribed to an observable we created
    //
    // unsubscribe(channel: string): Rx.Observable<any> {
    //     this.observables = this.observables.filter((x: ChannelObservable) => {
    //         return x.channel === channel;
    //     });
    // }

    /** publish provides a way for calles to emit events on any channel. In a 
     * production app the server would ensure that only authorized clients can
     * actually emit the message, but here we're not concerned about that.
     */
    publish(ev: ChannelEvent): void {
        this.hubProxy.invoke("Publish", ev);
    }

}