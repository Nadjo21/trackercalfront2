import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculimcComponent } from './calculimc/calculimc.component';
import { FooddiaryComponent } from './fooddiary/fooddiary.component';
import { PeseeComponent } from './weightmeas/pesee.component';
import { ProgressComponent } from './progress/progress.component';
import { DataupdateComponent } from './dataupdate/dataupdate.component';
import {RouterModule} from "@angular/router";
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculimcComponent,
    FooddiaryComponent,
    PeseeComponent,
    ProgressComponent,
    DataupdateComponent,
    WelcomepageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: WelcomepageComponent },
      { path: 'imc', component: CalculimcComponent},
      { path: 'diary', component: FooddiaryComponent },
      { path: 'weight', component: PeseeComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'data', component: DataupdateComponent },
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
