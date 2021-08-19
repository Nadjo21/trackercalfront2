import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder} from "@angular/forms";
import {Foodintake} from "../foodintake";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})



export class ProgressComponent implements OnInit {
//detail formulaire
  foodTakenForm = this.formBuilder.group({
    date:'',
      });

  //pour ngIf et clic event
   editForm = false;
   editTable = false;


 // private foodIntake: Foodintake | undefined;
  date: any |undefined;
  foodIntakeList = this.api.getFoodIntakeList();

  private filterFoodIntake :Foodintake [] | undefined;

  constructor(private api:ApiService,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  clicHistorique() {
    this.editForm = true;
  }


  selecteddate(date : any) {
    this.date=this.foodTakenForm.get("date")?.value;
    let foodIntakeList = this.api.getFoodIntakeList().subscribe(()=>{
     //let filterFoodIntake = this.foodIntakeList.pipe(filter(this.date));
      console.log("clic bouton  " + this.date);
      //j'affiche le tableau
      this.editTable=true;


    });

  }


}
