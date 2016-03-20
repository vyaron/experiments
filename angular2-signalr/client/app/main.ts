import {bootstrap} from 'angular2/platform/browser';
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";

import {AppComponent} from './app.component';

import {ChannelService, ChannelConfig, SignalrWindow} from "./services/channel.service";


let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "EventHub";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ChannelService,
    provide(SignalrWindow, {useValue: window}),
    provide("channel.config", { useValue: channelConfig })
]);
