import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {CityFormValidation} from './cityForm-validation';

@Component({
    selector: 'app-tnwa2',
    templateUrl: './tnwa2.component.html',
    styleUrls: ['./tnwa2.component.scss']
})
export class Tnwa2Component implements OnInit {
    form = new FormGroup({
        cityName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            // CityFormValidation.cannotContainNumbers,
            CityFormValidation.shouldBeCity]
        ),
        radioOpt: new FormControl('', Validators.required),
        cityList: new FormArray([])
    });

    get cityName() {
        return this.form.get('cityName');
    }

    constructor() {
    }

    get formCityList() {
        return this.form.get('cityList') as FormArray;
    }

    addCityInHistoryList(city) {
        console.log(city);
        this.formCityList.push(new FormControl(city));
        console.log(this.formCityList);
    }

    // removeCity(city: FormControl) {
    //     const index = this.formCityList.indexOf(city);
    //     this.formCityList.removeAt(index);
    // }


    submit(city: HTMLInputElement) {
        this.addCityInHistoryList(city.value);
        this.form.reset();
    }

    ngOnInit() {
    }
}
