import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CalculimcComponent} from './calculimc/calculimc.component';
import {FooddiaryComponent} from './fooddiary/fooddiary.component';
import {WeightmeasComponent} from './weightmeas/weightmeas.component';

import {DataupdateComponent} from './dataupdate/dataupdate.component';
import {RouterModule} from "@angular/router";
import {WelcomepageComponent} from './welcomepage/welcomepage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ChartsModule} from "ng2-charts";
import {NgxSliderModule} from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [
    AppComponent,
    CalculimcComponent,
    FooddiaryComponent,
    WeightmeasComponent,
    DataupdateComponent,
    WelcomepageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgxSliderModule,

    RouterModule.forRoot([
      {path: '', component: WelcomepageComponent},
      {path: 'imc', component: CalculimcComponent},
      {path: 'diary', component: FooddiaryComponent},
      {path: 'weight', component: WeightmeasComponent},
          {path: 'data', component: DataupdateComponent},
    ]),
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
