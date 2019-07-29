import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {WeatherData} from './weather-data';


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

    getWeather(city, days, type) {
        return this.http.get(this.url + type + '?key=' + this.apiKey + '&q=' + city + '&days=' + days).pipe(
            map((res) =>
                res
            )
        );
    }

    /* GET heroes whose name contains search term */
    searchCity(term: string): Observable<WeatherData[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<WeatherData[]>(`${this.url}search.json?key=${this.apiKey}&q=${term}&days=0`).pipe(
            // tap(_ => this.log(`found heroes matching "${term}"`)),
            // catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }
}
