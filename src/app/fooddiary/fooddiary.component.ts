import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Foodintake} from "../foodintake";
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
    fooddetail: '',
    quantity: '',
  });


  //ici , foodlist correspond a toute la liste des aliments que  je récupère de l'API  :
  foodList = this.api.getFoodList();
//subtotal : any;



  private food: Food | undefined;
  private foodIntake: Foodintake | undefined;
  selectedFoodList: Foodintake [] = [];

  // newFoodRow: any;
  // private date: any;
  //  private name: any;
  // private quantity: any;
  // private calories: any;


  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }


  ngOnInit(): void {

  }

//fonction ci dessous pour reagir au changement de selection de l'aliment dans le menu deroulant:


  changeFood($event: Event) {

    //je selectionne un aliment dans mon menu deroulant et je charge la liste de tous les aliments
    this.api.getFoodList().subscribe(() => {
      console.log('test changement selection');
      //je recupere le detail l'aliment selectionné
      this.food = this.foodDiaryForm.get('fooddetail')?.value;
      console.log("Detail de mon objet food selectionné" + " " + this.food);

    })
  }


  addfoodline() {
    console.log(this.foodDiaryForm.get('fooddetail')?.value);

  //  this.newFoodRow =

    this.foodIntake =
      {
        // @ts-ignore
        id: null,
        date: this.foodDiaryForm.get('date')?.value,
        quantity: this.foodDiaryForm.get('quantity')?.value,
        food: this.foodDiaryForm.get('fooddetail')?.value,


       // name: this.name = this.foodDiaryForm.get('fooddetail')?.value.name,
        //
        //  calories: this.calories = this.foodDiaryForm.get('fooddetail')?.value.calories,
      }

    console.log("test click bouton ajouter");

//calcul total de calories par ligne d'aliments saisis //OK

 //   this.subtotal = this.newFoodRow.quantity * this.newFoodRow.calories;
//console.log("ceci est mon subtotal  :" +this.subtotal)

    //pour ajouter une nouvelle ligne a chaque clic



    //this.selectedFoodList.push(this.newFoodRow);
    if (this.foodIntake) {
      this.selectedFoodList.push(this.foodIntake);
    }

  }


  foodDiarySave() {

    //
    // this.foodIntake = {
    //   // @ts-ignore
    //   id: null,
    //   date: this.newFoodRow.date,
    //   quantity: this.newFoodRow.quantity,
    //   food_id: this.newFoodRow.name,
    // };


    console.log("test click bouton sauvegarder");

    //appel de l'API pour inserer les données dans la BDD

    this.api.createFoodIntake(this.foodIntake).subscribe(foodIntake => {

      console.log(this.foodIntake);
    })



  }


}
