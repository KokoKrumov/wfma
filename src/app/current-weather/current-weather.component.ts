import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {CityData, WeatherData, WeatherDay} from '../weather-data';
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
    cities$: Observable<CityData[]>;
    cityNameInput: string;
    cityName: string;
    cityRegion: string;
    weatherIcon: string;
    city: CityData;
    weather: WeatherData;
    days: number;
    activeBtn: number;
    calendarDays;
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

        this.weatherService.getWeather(city, days, type).subscribe(
            (response: WeatherData) =>
                this.weather = response
        );
    }

    ngOnInit() {

        this.cityName = 'Sofia';
        this.days = 0;
        this.activeBtn = 0;

        this.weatherService.getWeather(this.cityName, this.days, this.type).subscribe((response: WeatherData) =>
            this.weather = response
        );

        this.cities$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(10),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.weatherService.searchCity(term)),
        );
    }

    trackDays(index, day) {
        return day ? day.id : undefined;
    }

    submit(city, days, type) {
        this.cityName = city;
        this.days = days;
        this.activeBtn = days;

        if (days > 0) {
            this.type = 'forecast.json';
        } else {
            this.type = 'current.json';
        }

        this.showWeather(this.cityName, this.days, this.type);
        console.log(this.weather);
        this.weatherIcon = this.weather.current.condition.icon;
        this.calendarDays = this.weather.forecast.forecastday;
    }


}
