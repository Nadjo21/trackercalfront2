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
  private food: Food | undefined;
  private foodIntake: Foodintake | undefined;
  selectedFoodList: Foodintake [] = [];



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

    //je crée un objet foodIntake -
    // 1 foodIntake = ligne du tableau

    this.foodIntake =
      {
        // @ts-ignore
        id: null,
        date: this.foodDiaryForm.get('date')?.value,
        quantity: this.foodDiaryForm.get('quantity')?.value,
        food: this.foodDiaryForm.get('fooddetail')?.value,
      }

    console.log("test click bouton ajouter");

    //j'ajoute une nouvelle ligne à chaque clic ( + *ngFor côté HTML) :

    if (this.foodIntake) {
      this.selectedFoodList.push(this.foodIntake);

    }

  }

  foodDiarySave() {
// pour enregistrer toutes les données de mon tableau en une seule fois , je fais une boucle
// sur selectedFoodList - je transforme ensuite chaque [i] en foodIntake avant appel a l'API

    for (let i = 0; i < this.selectedFoodList.length; i++) {
      console.log(this.selectedFoodList[i]);
      this.foodIntake = this.selectedFoodList[i];
      //appel api pour insertion BDD
       this.api.createFoodIntake(this.foodIntake).subscribe(foodIntake => {
         console.log(this.foodIntake);


       })

    }





  }


}
