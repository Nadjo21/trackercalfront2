import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder} from "@angular/forms";
import {Foodintake} from "../foodintake";



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
  // @ts-ignore
  foodIntakeFoundByDate = this.api.getFoodIntakeByDate(this.date);

 private foodIntake :Foodintake [] | undefined;

  constructor(private api:ApiService,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  clicHistorique() {
    this.editForm = true;
  }

  selecteddate(Date : number) {
    this.date=this.foodTakenForm.get("date")?.value;
    let foodIntakeFoundbyDate = this.api.getFoodIntakeByDate(this.date).subscribe(()=>{
      console.log("clic bouton  " + this.date);


      //j'affiche le tableau
      this.editTable=true;

    });

  }

}
