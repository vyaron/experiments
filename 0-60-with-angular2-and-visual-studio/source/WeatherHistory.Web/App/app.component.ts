import {Component} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";

import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
    
import {ZipcodeWeather, ZipcodeWeatherMapper} from "./zipcodeWeather.model";

@Component({
    selector: "my-weather-app",
    directives: [CHART_DIRECTIVES],
    styles: [ require("./app.styles.scss") ],
    template: `
        <div class="application flex-col">
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

                <base-chart class="chart"
                           [datasets]="barChartData"
                           [labels]="barChartLabels"
                           [options]="barChartOptions"
                           [legend]="barChartLegend"
                           [chartType]="barChartType"></base-chart>
            <div>
        </div>
    `,
})
export class AppComponent {

    zipcode: string;
    zipcodeWeather: ZipcodeWeather;
    errorMessage: string;

    loading = false;

    barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    barChartType: string = 'bar';
    barChartLegend: boolean = true;
    barChartLabels: string[];
    barChartData: any[];

    constructor(
        private http: Http
    ) {
    }


    loadWeather() {
        this.errorMessage = undefined;
        this.zipcodeWeather = undefined;
        this.loading = true;

        this.http
            .get(`http://localhost:52588/api/temperatures?zipcode=${this.zipcode}`, {
                headers: new Headers({
                    'Accept': '*/*'
                })
            })
            .subscribe(
            (response: Response) => {
                this.loading = false;
                this.zipcodeWeather = ZipcodeWeatherMapper.fromObject(response.json());

                // Now map the response into the data we need for the chart
                //
                this.barChartLabels = this.zipcodeWeather.HistoricalTemperatures.map(x => x.date.getFullYear().toString());

                this.barChartData = [
                    {
                        data: this.zipcodeWeather.HistoricalTemperatures.map(x => x.low),
                        label: "Low"
                    },
                    {
                        data: this.zipcodeWeather.HistoricalTemperatures.map(x => x.high),
                        label: "High"
                    }
                ];
            },
            (error: Response) => {
                this.errorMessage = error.json().message;
                this.loading = false;
            }
            );
    }
}