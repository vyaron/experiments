import {Component} from "@angular/core";
import {Http} from "@angular/http";

@Component({
    selector: "my-weather-app",
    styles: [`
        .container {
            display: flex;
            flex-direction: flex-row;
        }
    `],
    template: `
        <div class="container">
            <div>
                <input 
                    type="text"
                    [(ngModel)]="zipcode"/>
                <button
                    (click)="loadWeather()">
                    Load weather
                </button>
            </div>
        </div>
    `,
})
export class AppComponent {

    zipcode: string;

    constructor(
        private http: Http
    )
    { }


    loadWeather() {
        this.http
            .get(`http://localhost:52588/api/temperatures?zipcode=${this.zipcode}`)
            .subscribe(
                (response: any) => {
                    console.log(response);
                },
                (error: any) => {
                    console.log(error);
                },
                () => {
                    console.log("Request complete");
                }
        );
    }
}