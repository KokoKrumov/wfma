import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CurrentWeatherComponent} from './current-weather/current-weather.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './weather.service';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { TnwaComponent } from './tnwa/tnwa.component';
import {removeChar} from './removeChar';
import { Tnwa2Component } from './tnwa2/tnwa2.component';
import { CityHistoryListComponent } from './city-history-list/city-history-list.component';


const appRoutes = [
    {
        path: '', component: Tnwa2Component
    },
    {
        path: 'home', component: CurrentWeatherComponent
    }
]

@NgModule({
    declarations: [
        AppComponent,
        CurrentWeatherComponent,
        HeaderComponent,
        FooterComponent,
        SearchBarComponent,
        WeatherDetailComponent,
        removeChar,
        TnwaComponent,
        Tnwa2Component,
        CityHistoryListComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        WeatherService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
