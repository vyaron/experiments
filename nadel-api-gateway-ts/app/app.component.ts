// CREDIT:
//  The vast majority of this code came right from Ben Nadel's post:
//  http://www.bennadel.com/blog/3047-creating-specialized-http-clients-in-angular-2-beta-8.htm
//
// My updates are mostly adapting it for Typescript:
//  1. Importing required modules
//  2. Adding type notations
//  3. Using the 'fat-arrow' syntax to properly scope in-line functions
//
import {Component, OnInit} from 'angular2/core';
import {Subscription} from "rxjs/Subscription";

// Import the services we need
//
import {ApiGateway} from "./apiGateway.service";
import {FriendService, Friend} from "./friend.service";

@Component({
    selector: 'my-app',
    template: `
        <p>
            <a (click)="loadFriend( 1 )">Load Friend 1</a>
            &nbsp;|&nbsp;
            <a (click)="loadFriend( 2 )">Load Friend 2</a>
            &nbsp;|&nbsp;
            <a (click)="loadFriend( 3 )">Load Friend 3</a>
            &nbsp;|&nbsp;
            <a (click)="loadFriend( 4 )">Load Friend 4 (Not Found)</a>
            &nbsp;|&nbsp;
            <a (click)="updateFriend( 1 )">Update Friend 1</a>
        </p>
        <div *ngIf="friend">
            <h3>
                {{ friend.name }}
            </h3>
            <ul>
                <li>
                    <strong>ID</strong>: {{ friend.id }}
                </li>
                <li>
                    <strong>Name</strong>: {{ friend.name }}
                </li>
                <li>
                    <strong>Description</strong>: {{ friend.description }}
                </li>
            </ul>
        </div>    
    `
})
export class AppComponent implements OnInit {

    friend: Friend;

    private currentSubscription: Subscription;

    constructor(
        private friendService: FriendService,
        private apiGateway: ApiGateway
    ) { }


    ngOnInit() {
        this.apiGateway.pendingCommands$.subscribe(
            function handleValue(pendingCount) {
                console.debug("Pending commands:", pendingCount);
            }
        );
    }


    loadFriend(id: number): void {

        // If we have an existing request subscription, cancel it.
        // --
        // NOTE: If the request already completed, there is no harm here.
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
        }

        // Request the new friend and keep track of the response
        // subscription so that we can cancel it in the future.
        this.currentSubscription = this.friendService
            .getFriend(id)
            .subscribe(
                (newFriend: Friend) => {
                    this.friend = newFriend;
                },
                (error: any) => {
                    console.warn("Could not load friend.");
                    console.dir(error);
                });
    }

    updateFriend(id: number): void {
        console.warn("We are about to try a POST (this may not work in your environment).");
        
        this.friendService
            .updateFriend(id, "Lisa")
            .subscribe(
                () => {},
                () => {}
            );
    }
}
