


export class ZipcodeWeather {
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    HistoricalTemperatures: Array<HistoricalTemperature>;

    constructor() {
        this.HistoricalTemperatures = new Array<HistoricalTemperature>();
    }
}


export class HistoricalTemperature {
    date: Date;
    low: number;
    high: number;
}



export class ZipcodeWeatherMapper {
    static fromObject(x: any): ZipcodeWeather {
        const result = new ZipcodeWeather();

        Object.assign(result, x);

        result.HistoricalTemperatures = HistoricalTemperatureMapper.fromArray(x.historicalTemperatures);

        return result;
    }
}


export class HistoricalTemperatureMapper {
    static fromObject(x: any): HistoricalTemperature {
        const result = new HistoricalTemperature();

        Object.assign(result, x);

        return result;
    }

    static fromArray(x: any[]): HistoricalTemperature[] {
        if (x === undefined || x === null) {
            return new Array<HistoricalTemperature>();
        }

        return x.map((i: any) => HistoricalTemperatureMapper.fromObject(i));
    }
}