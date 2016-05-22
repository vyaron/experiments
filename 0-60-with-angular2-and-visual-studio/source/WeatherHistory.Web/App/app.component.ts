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
                    [(ngModel)]="zipcode"/>
                <button
                    (click)="loadWeather()">
                    Load weather
                </button>
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

    constructor(
        private http: Http
    )
    {
    }


    loadWeather() {
        this.http
            .get(`http://localhost:52588/api/temperatures?zipcode=${this.zipcode}`)
            .subscribe(
                (response: Response) => {
                    this.zipcodeWeather = ZipcodeWeatherMapper.fromObject(response.json());
                },
                (error: any) => {
                    console.log(error);
                    this.zipcodeWeather = undefined;
                },
                () => {
                    console.log("Request complete");
                }
        );
    }
}