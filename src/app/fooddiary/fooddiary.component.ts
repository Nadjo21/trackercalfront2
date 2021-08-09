import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

import {ApiService} from "../api.service";
import {Food} from '../food';


@Component({
  selector: 'app-fooddiary',
  templateUrl: './fooddiary.component.html',
  styleUrls: ['./fooddiary.component.css']
})
export class FooddiaryComponent implements OnInit {
  foodDiaryForm = this.formBuilder.group({
    date: '',
    name: '',
    quantity: '',
    type: '',
    calories: '',
  });

  //ici , foodlist correspond a ce que je récupere de l'API  :
  foodList = this.api.getFoodList();



  foodintake: any;
 private name: any;
  private quantity: any;
  private type: any;
  private calories: any;
  private date: any;
  private id: undefined;



  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }


  ngOnInit(): void {


  }

  foodDiarySave() {


    console.log("test click");


    // a completer

  }


//TODO permettre l'ajout de plusierus lignes et calculer les calories en focntion de l quantité renseignée
  subtotal: any;
  private foodid: undefined;
  food: string | undefined;



  addfoodline() {


    this.foodintake =

      {
        id: null,
        name: this.name = this.foodDiaryForm.get('name')?.value,
        date: this.date = this.foodDiaryForm.get('date')?.value,
        quantity: this.quantity = this.foodDiaryForm.get('quantity')?.value,
        type: this.type = this.foodDiaryForm.get('type')?.value,
        calories: this.calories = this.foodDiaryForm.get('calories')?.value
      }

    console.log();






//calcul total de calories par ligne d'aliments saisis //OK
    this.subtotal = this.foodintake.quantity * this.foodintake.calories;





  }


  changeFood($event: Event) {

    // si je change l'aliment selectionné dans le menu deroulant, j'impacte les calories
    //j'appelle l'PAI pour recuperer le nombre de calories correspondant a ma selection


  }
}
