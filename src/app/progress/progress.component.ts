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


  foodIntakeList = this.api.getFoodIntakeList();
   foodTaken = this.formBuilder.group({
    date:'',
      });

   editForm = false;
   editTable = false;


  private foodIntake: Foodintake | undefined;
  date: any;



  constructor(private api:ApiService,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  clicHistorique() {
    this.editForm = true;
  }


  selecteddate() {

    let foodIntakeList = this.api.getFoodIntakeList().subscribe(()=>{
      console.log("clic bouton  ");




      //j'affiche le tableau
      this.editTable=true;


    });



  }
}
