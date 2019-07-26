import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';


@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
    city: string;
    weather: any;
    days: number;
    activeBtn = false;
    calendarDays: [];


    constructor(public weatherService: WeatherService) {
        if (this.city === undefined) {
            this.city = 'Sofia';
            this.days = 0;
        }
    }

    showWeather(city, days) {
        this.weatherService.getWeather(city, days).subscribe((response) =>
            this.weather = response
        );
    }

    ngOnInit() {
        this.showWeather(this.city, this.days);
    }


    setDays(city, days) {
        this.submit(city, days);
    }

    submit(city, days) {
        this.calendarDays = this.weather.forecast;
        console.log(this.calendarDays);
        this.showWeather(city, days);
        this.weather = city;

        this.weatherService.getWeather(city, days).subscribe((response) =>
            console.log(response)
        );
    }

}
