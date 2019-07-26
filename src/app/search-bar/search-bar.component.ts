import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


    constructor(public weatherService: WeatherService) {
    }


    ngOnInit() {
    }


}
