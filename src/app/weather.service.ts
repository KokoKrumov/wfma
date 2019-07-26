import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    url;
    apiKey = '55b0ae36221840c985b110132181802';
    // days = 'current.json';
    days = 'forecast.json';

    // http://api.apixu.com/v1/current.json?key=<YOUR_API_KEY>&q=London
    constructor(private http: HttpClient) {
        this.url = 'http://api.apixu.com/v1/';
    }

    getWeather(city, days) {
        return this.http.get(this.url + this.days + '?key=' + this.apiKey + '&q=' + city + '&days=' + days).pipe(
            map((res) =>
                res
            )
        );
    }
}
