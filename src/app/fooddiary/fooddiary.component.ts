import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Foodintake} from "../foodintake";
import {ApiService} from "../api.service";
import {Food} from '../food';
import {parseJson} from "@angular/cli/utilities/json-file";


@Component({
  selector: 'app-fooddiary',
  templateUrl: './fooddiary.component.html',
  styleUrls: ['./fooddiary.component.css']
})
export class FooddiaryComponent implements OnInit {
  foodDiaryForm = this.formBuilder.group({
    date: '',
    fooddetails: '',
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


//je represente la selection de l'aliment dans le menu déroulant

 // private food :Food |undefined;


  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }


  ngOnInit(): void {

  }

//fonction cid essous pour reagir au changement de selection de l'aliment dans le menu deroulant:
  changeFood($event: Event) {

    this.api.getFoodList().subscribe(()=>{

      console.log('test changement selection');

      let food = this.foodDiaryForm.get('fooddetails' )?.value;


      console.log("détail de mon objet food selectionné" + food);
    })

    // si je change l'aliment selectionné dans le menu deroulant, j'impacte les calories
    //j'appelle l'APi pour recuperer le nombre de calories correspondant a ma selection


  }


  foodDiarySave() {

    // this.foodintake =
    //
    //   {
    //     id: null,
    //     name: this.name = this.foodDiaryForm.get('foodname')?.value,
    //     date: this.date = this.foodDiaryForm.get('date')?.value,
    //     quantity: this.quantity = this.foodDiaryForm.get('quantity')?.value,
    //     type: this.type = this.foodDiaryForm.get('type')?.value,
    //     calories: this.calories = this.foodDiaryForm.get('calories')?.value,
    //   }
    //
    // console.log("test click bouton sauvegarder");


  }


//TODO permettre l'ajout de plusieurs lignes et calculer les calories en focntion de la quantité renseignée
  subtotal: any;


  addfoodline() {


    //this.food = this.foodDiaryForm.get('name')?.value;

   this.foodintake =

      {
        id: null,
        name: this.name = this.foodDiaryForm.get('name')?.value,
        date: this.date = this.foodDiaryForm.get('date')?.value,
        quantity: this.quantity = this.foodDiaryForm.get('quantity')?.value,
        type: this.type = this.foodDiaryForm.get('type')?.value,
        calories: this.calories = this.foodDiaryForm.get('calories')?.value,

      }

    console.log("test click bouton ajouter");

//calcul total de calories par ligne d'aliments saisis //OK
   this.subtotal = this.foodintake.quantity * this.foodintake.calories;


  }



}
