import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-city-history-list',
    templateUrl: './city-history-list.component.html',
    styleUrls: ['./city-history-list.component.scss']
})
export class CityHistoryListComponent implements OnInit {

    @Input() cityList: string;
    @Output() change = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }


    removeCity(city) {
        this.change.emit(city);
    }
}
