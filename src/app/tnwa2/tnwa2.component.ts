import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CityFormValidation} from './cityForm-validation';

@Component({
    selector: 'app-tnwa2',
    templateUrl: './tnwa2.component.html',
    styleUrls: ['./tnwa2.component.scss']
})
export class Tnwa2Component implements OnInit {

    form = new FormGroup({
        cityName: new FormControl('',
            Validators.required,
            // Validators.minLength(3),
            // CityFormValidation.cannotContainNumbers,
            CityFormValidation.shouldBeCity
        ),
        radioOpt: new FormControl('', Validators.required)
    });

    get cityName() {
        return this.form.get('cityName');
    }

    constructor() {
    }

    ngOnInit() {
    }
}
