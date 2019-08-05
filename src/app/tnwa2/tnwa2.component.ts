import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {CityFormValidation} from './cityForm-validation';
import {HttpClient} from '@angular/common/http';
import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {CityData, WeatherData} from '../weather-data';

@Component({
  selector: 'app-tnwa2',
  templateUrl: './tnwa2.component.html',
  styleUrls: ['./tnwa2.component.scss']
})
export class Tnwa2Component implements OnInit {
  cities$: Observable<CityData[]>;
  city: string;
  private url = 'http://api.apixu.com/v1/forecast.json?key=55b0ae36221840c985b110132181802&q=';
  cityForecastObject: any;
  temp: string;
  avgTemp: string;
  minTemp: string;
  maxTemp: string;
  tempFeels: any;
  locationName: string;
  imgSrc: string;
  activeBtn: string;
  windSpeed: number;
  humidity: number;
  setDays = '0';
  day: any;
  arrDays = [];
  arrDayLength: number;
  date: string;
  nextDay: any;
  private searchTerms = new Subject<string>();

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

  search(term: string): void {
    this.searchTerms.next(term);
  }

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

  getResponse(city, days) {
    this.http.get(this.url + city + '&days=' + days).subscribe((response: WeatherData) => {
      this.cityForecastObject = response;

      this.arrDays = this.cityForecastObject.forecast.forecastday;

      console.log('response', response);
      console.log('array of days', this.arrDays);
      console.log('tommorow - 6', this.nextDay);

      this.arrDayLength = this.arrDays.length;

      this.activeBtn = 'c';
      this.locationName = this.cityForecastObject.location.name;
      this.temp = this.cityForecastObject.current.temp_c + '°C';
      this.tempFeels = this.cityForecastObject.current.feelslike_c + '°C';

      if (this.arrDayLength < 2) {
        this.imgSrc = this.cityForecastObject.current.condition.icon;
        this.humidity = this.cityForecastObject.current.humidity;
        this.windSpeed = this.cityForecastObject.current.wind_kph;
        this.date = this.cityForecastObject.location.localtime;
      } else if (this.arrDayLength === 2) {
        console.log('123');
        this.nextDay = this.arrDays[1];
        this.imgSrc = this.arrDays[1].day.condition.icon;
        this.humidity = this.arrDays[1].day.avghumidity;
        this.windSpeed = this.arrDays[1].day.maxwind_kph;
        this.date = this.arrDays[1].date;
        this.avgTemp = this.arrDays[1].day.avgtemp_c;
        this.maxTemp = this.arrDays[1].day.maxtemp_c;
        this.minTemp = this.arrDays[1].day.mintemp_c;
      }
    });
  }

  trackDays(index, day) {
    return day ? day.date : undefined;
  }

  changeTemp(type: string) {
    if (type === 'c') {
      this.temp = this.cityForecastObject.current.temp_c + '°C';
      this.tempFeels = this.cityForecastObject.current.feelslike_c + '°C';
      this.activeBtn = 'c';
      this.avgTemp = this.nextDay.day.avgtemp_c + '°C';
      this.maxTemp = this.nextDay.day.maxtemp_c + '°C';
      this.minTemp = this.nextDay.day.mintemp_c + '°C';
    } else {
      this.activeBtn = 'f';
      this.temp = this.cityForecastObject.current.temp_f + '°F';
      this.tempFeels = this.cityForecastObject.current.feelslike_f + '°F';
      this.avgTemp = this.nextDay.day.avgtemp_f + '°F';
      this.maxTemp = this.nextDay.day.maxtemp_f + '°F';
      this.minTemp = this.nextDay.day.mintemp_f + '°F';
    }
  }

  loadCityFromList(city) {
    console.log(this.formCityList.controls);
    console.log('city', city.value);
    // this.form.get('cityName').setValue(city.value);
    this.getResponse(city.value, this.setDays);
  }

  submit(city: HTMLInputElement, days) {
    this.setDays = days;
    this.addCityInHistoryList(city.value);
    this.getResponse(city.value, this.setDays);
    city.value = '';
  }

  nexDays(city, days) {
    this.setDays = days;
    this.getResponse(city, this.setDays);
  }

  searchCity(term): Observable<CityData[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<CityData[]>(`${this.url}search.json?key=55b0ae36221840c985b110132181802&q=${term}&days=0`).pipe(
      // tap(_ => this.log(`found heroes matching "${term}"`))
      // catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  ngOnInit() {
    this.cities$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(10),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchCity(term)),
    );
  }
}
