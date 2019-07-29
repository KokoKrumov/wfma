import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {WeatherData, WeatherDay} from '../weather-data';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';


@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
    cities$: Observable<WeatherData[]>;
    city: string;
    weather: WeatherData;
    days: number;
    activeBtn: number;
    calendarDays: [];
    daysNext: any;
    region: string;
    type = 'search.json';
    private searchTerms = new Subject<string>();

    constructor(public weatherService: WeatherService) {

    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    showWeather(city, days, type) {
        console.log(city, days, type);
        this.weatherService.getWeather(city, days, type).subscribe((response: WeatherData) =>
            this.weather = response
        );
    }

    ngOnInit() {
        if (this.city === undefined) {
            this.city = 'Sofia';
            this.days = 0;
            this.activeBtn = 0;
        }
        this.showWeather(this.city, this.days, this.type);
        console.log();


        this.cities$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.weatherService.searchCity(term)),
        );
    }

    submit(city, days, type) {
        this.city = city;
        this.days = days;
        this.activeBtn = days;

        if (days > 0) {
            this.type = 'forecast.json';
        }

        this.showWeather(this.city, this.days, this.type);

        this.weatherService.getWeather(city, days, type).subscribe((response) =>
            console.log('response', response)
        );
    }


}
