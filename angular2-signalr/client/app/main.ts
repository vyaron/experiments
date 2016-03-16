import {bootstrap} from 'angular2/platform/browser';
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";

import {AppComponent} from './app.component';

import {ApiService} from "./services/api.service";
import {ChannelService, ChannelConfig} from "./services/channel.service";

let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "EventHub";
channelConfig.channel = "tasks";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ApiService,
    ChannelService,
    provide("channel.config", { useValue: channelConfig })
]);
