export interface WeatherData {
    current: {
        temp_c: number,
        temp_f: number,
        feelslike_c: number
        feelslike_f: number,
        humidity: number,
        wind_kph: number,
        condition: {
            icon: string,
            text: string,
        }
    };
    location: {
        country: string,
        name: string,
        region: string
    };
    forecast?: {
        forecastday?: {
            date: string;
            length: number;
            day: {
                avgtemp_c: number;
                avgtemp_f: number;
                maxtemp_c: number;
                maxtemp_f: number;
            };
        }
    };
}

export interface WeatherDay {
    date: string;
    length: number;
    day: {
        avgtemp_c: number;
        avgtemp_f: number;
        maxtemp_c: number;
        maxtemp_f: number;
    };
}
