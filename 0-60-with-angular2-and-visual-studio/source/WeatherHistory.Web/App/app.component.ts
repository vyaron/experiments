import {Component} from "@angular/core";
import {Http, Response} from "@angular/http";

import {ZipcodeWeather, ZipcodeWeatherMapper} from "./zipcodeWeather.model";

@Component({
    selector: "my-weather-app",
    styles: [`
        .flex-col {
            display: flex;
            flex-direction: column;
        }

        .loading {

        }

        .error {
            margin: 5px;
            padding: 10px;
            background-color: red;
            color: white;
        }

        .result {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
        }
    `],
    template: `
        <div class="flex-col">
            <div>
                <input 
                    type="text"
                    (keyUp.enter)="loadWeather()"
                    [(ngModel)]="zipcode"/>
                <button
                    (click)="loadWeather()">
                    Load weather
                </button>
            </div>

            <div class="loading" *ngIf="loading">
                Loading weather data...
            </div>

            <div class="error" *ngIf="errorMessage">
                {{errorMessage}}
            </div>

            <div class="result" *ngIf="zipcodeWeather">
                <span>{{zipcodeWeather.city}}, {{zipcodeWeather.state}}</span>
                <span>{{zipcodeWeather.latitude}} {{zipcodeWeather.longitude}}</span>
                <div class="flex-col"
                     *ngFor="let temp of zipcodeWeather.historicalTemperatures">
                    <span>{{temp.date}} {{temp.low}} {{temp.high}}</span>   
                </div>
            <div>
        </div>
    `,
})
export class AppComponent {

    zipcode: string;
    zipcodeWeather: ZipcodeWeather;
    errorMessage: string;

    loading = false;

    constructor(
        private http: Http
    )
    {
    }


    loadWeather() {
        this.errorMessage = undefined;
        this.zipcodeWeather = undefined;
        this.loading = true;

        this.http
            .get(`http://localhost:52588/api/temperatures?zipcode=${this.zipcode}`)
            .subscribe(
                (response: Response) => {
                    this.zipcodeWeather = ZipcodeWeatherMapper.fromObject(response.json());
                    this.loading = false;
                },
                (error: Response) => {
                    this.errorMessage = error.json().message;
                    this.loading = false;
                }
        );
    }
}