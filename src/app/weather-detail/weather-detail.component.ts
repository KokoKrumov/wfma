import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-weather-detail',
    templateUrl: './weather-detail.component.html',
    styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

    constructor() {
    }

    @Input() city;

    ngOnInit() {
    }

}
