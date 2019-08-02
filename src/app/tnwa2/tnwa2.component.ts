import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {CityFormValidation} from './cityForm-validation';
import {HttpClient} from '@angular/common/http';
import {stringify} from 'querystring';

@Component({
    selector: 'app-tnwa2',
    templateUrl: './tnwa2.component.html',
    styleUrls: ['./tnwa2.component.scss']
})
export class Tnwa2Component implements OnInit {

    cityForecast: any;
    city: string;
    citynamed: any;
    private url = 'http://api.apixu.com/v1/current.json?key=55b0ae36221840c985b110132181802&q=';
    cityForecastObject: any;
    displayCityName;


    constructor(private http: HttpClient) {
        http.get(this.url);
    }

    form = new FormGroup({
        cityName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                CityFormValidation.cannotContainNumbers,
                // CityFormValidation.shouldBeCity
            ]
        ),
        radioOpt: new FormControl('', Validators.required),
        cityList: new FormArray([])
    });

    get cityName() {
        return this.form.get('cityName');
    }

    get formCityList() {
        return this.form.get('cityList') as FormArray;
    }

    addCityInHistoryList(city) {
        // check if the city list contains the current city
        // if not containing it, then we add the city in the array
        const repeatCity = this.formCityList.controls.find(ob => ob['value'] === city);

        if (repeatCity === undefined) {
            this.formCityList.push(new FormControl(city));
        }
    }

    loadCityFromList(city) {
        console.log('city', city.value);
        // this.form.get('cityName').setValue(city);
        // this.city = city;
        // this.http.get(this.url + this.city).subscribe(response => {
        //     console.log(response);
        // });
        console.log(this.formCityList.controls);
    }

    submit(city: HTMLInputElement) {
        this.city = city.value;
        this.addCityInHistoryList(city.value);
        city.value = '';
        // this.http.get(this.url + this.city).subscribe(response => {
        //     this.cityForecastObject = response;
        // });
        // this.displayCityName = this.cityForecastObject.location.name;
    }

    ngOnInit() {
    }
}
