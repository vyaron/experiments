import {bootstrap} from 'angular2/platform/browser';
import {provide} from "angular2/core";

import {AppComponent} from './app.component';
import {ApiConfig} from "./api.service";

// Here is the overall technique. Instead of just calling Angular's
//  bootstrap method directly, we'll export a function that accepts
//  arguments. This provides a way to "inject" external data into
//  the process, and change how Angular is bootstrapped based on
//  the provided input.
//
export function RunApplication(apiUrl: string, apiToken: string) {

    // Create our API config provider using the external data
    //
    let apiConfig = new ApiConfig();
    apiConfig.apiUrl = apiUrl;
    apiConfig.apiToken = apiToken;
    
    // Now we can call bootstrap, but we have the API config object
    //  set up as well. Just create is as an injectable token here
    //  so other components/services can consume it.
    //
    bootstrap(AppComponent, [
        provide("api.config", {useValue: apiConfig})
    ]);  
}
