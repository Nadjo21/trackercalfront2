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
  // Je crée mon objet JS qui représente le formulaire d'édition de l'enregistrement de mes données
  foodtaken = this.formBuilder.group({
    date: '',
      });



  Foodintake: any;

  foodIntakeList: any;




  constructor(private api:ApiService,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

     this.foodIntakeList = this.api.getFoodIntakeList();
  }


  selecteddate() {

    //j'appelle l'API :
    this.foodIntakeList = this.api.getFoodIntakeList().subscribe(()=>{
      console.log(this.foodIntakeList);

    });

  }
}
