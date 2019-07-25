import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Weather} from '../weather';


@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

    city: string;

    weather: any = {
        location: {
            name: 'Sofia'
        },
        current: {
            condition: {
                icon: 'none',
                text: 'none'
            }
        }
    };

    constructor(private weatherService: WeatherService) {
    }

    ngOnInit() {
        this.weatherService.getWeather(this.weather.location.name).subscribe((response) =>
            // console.log(response)
            this.weather = response
        );
    }

    submit() {

        this.weatherService.getWeather(this.city).subscribe((response) =>
            this.weather = response
        );
        this.weatherService.getWeather(this.city).subscribe((response) =>
            console.log(response)
        );
    }

}
