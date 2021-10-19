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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ChartsModule} from "ng2-charts";
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {LoginComponent} from "./login/login.component";
import {JwtInterceptor} from "./jwt.interceptor";
import {AuthGuard} from "./auth.guards";


@NgModule({
  declarations: [
    AppComponent,
    CalculimcComponent,
    FooddiaryComponent,
    WeightmeasComponent,
    DataupdateComponent,
    WelcomepageComponent,
    LoginComponent

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
     {path: 'diary', component: FooddiaryComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN"]}},
      // {path: 'diary', component: FooddiaryComponent},
     // {path: 'weight', component: WeightmeasComponent},
      {path: 'weight', component: WeightmeasComponent,canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN"]}},
      {path: 'data', component: DataupdateComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN"]}},
     // {path: 'data', component: DataupdateComponent},
      {path: 'login', component: LoginComponent},


    ]),
    FormsModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
