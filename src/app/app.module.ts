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
import {FormsModule} from '@angular/forms';


const appRoutes = [
    {
        path: '', component: CurrentWeatherComponent
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
        FooterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
    providers: [
        WeatherService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
