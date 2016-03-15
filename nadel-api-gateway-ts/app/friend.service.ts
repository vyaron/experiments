// CREDIT:
//  The vast majority of this code came right from Ben Nadel's post:
//  http://www.bennadel.com/blog/3047-creating-specialized-http-clients-in-angular-2-beta-8.htm
//
// My updates are mostly adapting it for Typescript:
//  1. Importing required modules
//  2. Adding type notations
//  3. Using the 'fat-arrow' syntax to properly scope in-line functions
//

import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";

import {ApiGateway} from "./apiGateway.service";

export class Friend {
    id: number;
    name: string;
    description: string;
}


@Injectable()
export class FriendService {

    constructor(
        private apiGateway: ApiGateway
    )
    { }

    getFriend(id: number): Observable<Friend> {
        // NOTE: I could have hard-coded the "friends" token in the URL,
        // but I wanted to demonstrate the URL interpolation that is
        // being provided by the API gateway.
        var stream = this.apiGateway.get(
            "./api/:type/:id.json",
            {
                type: "friends",
                id: id,
                // Adding this to get more data in the query string for
                // the purposes of the demo.
                _cache: (new Date()).getTime()
            }
        )
            .map((value: any) => {
                let friend = new Friend();
                friend.id = value.id;
                friend.name = value.name;
                friend.description = value.description;
                
                return friend;
            });

        return stream;
    }


    updateFriend(id: number, name: string): Observable<any> {
        // CAUTION: A post won't work in GitHub pages. But, it should
        // still manage the changing count of pending requests.
        var stream = this.apiGateway.post(
            "./api/:type/:id.json",
            {
                type: "friends",
                id: id,
                // Adding this to get more data in the query string for
                // the purposes of the demo.
                _cache: (new Date()).getTime()
            },
            {
                name: name
            }
        );
        return (stream);
    }
}