import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Foodintake} from "../foodintake";
import {ApiService} from "../api.service";
import {Food} from '../food';
import {DatePipe} from "@angular/common";
import {Appuser} from "../appuser";

@Component({
  selector: 'app-fooddiary',
  templateUrl: './fooddiary.component.html',
  styleUrls: ['./fooddiary.component.css'],
  providers: [DatePipe]

})
export class FooddiaryComponent implements OnInit {

  foodDiaryForm = this.formBuilder.group({
    appuserdetail:'',
    date: '',
    fooddetail: '',
    quantity: '',
  });


  //ici , foodlist correspond a toute la liste des aliments que  je récupère de l'API  :
  foodList = this.api.getFoodList();
  private food: Food | undefined;
  private foodIntake: Foodintake | undefined;
  selectedFoodList: Foodintake [] = [];
  totalCalories = 0;
  private selectedFood: any;
  currentDate = new Date();
  emptyFoodintakeList = false;

  appUserList=this.api.getAppuserList();
  private appUser: Appuser | any;

  //pour retrouver le détail d'un foodIntake sur une date selectionnée
  // @ts-ignore
  // foodIntakeFoundByDate = this.api.getFoodIntakeByDate(this.date);

  private dateSelected: any;
  foodIntakeList = this.api.getFoodIntakeList();


  constructor(private formBuilder: FormBuilder, private api: ApiService, public datepipe: DatePipe) {
  }

  ngOnInit(): void {

    console.log(this.currentDate);
    //etapes pour insertion date du jour par defaut dans mon calendrier à l'affichage
    //je change le format de la date recuperee et je l'insere dans le formulaire
    let dDay = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
    console.log(dDay);
    //j'insere la date au bon format dans le formulaire
    this.foodDiaryForm.get('date')?.setValue(dDay);

  }


  //je selectionne un appuser dans mon menu deroulant et je charge la liste de tous les users
  changeAppUser($event: Event) {
    //je recupere le detail de l'appuser selectionné
    const appUserId= this.foodDiaryForm.get('appuserdetail')?.value.id;


    //je recupere la date selectionnée dans le calendrier
    this.dateSelected = this.foodDiaryForm.get("date")?.value;


    //je récupere la liste des foodintake pour ce user

    this.api.getFoodIntakeByDateandAppuser(this.dateSelected,appUserId).subscribe(result => {
      //je recupere le detail des foodintake trouvés dans le resultat et je stocke le resultat
      this.selectedFoodList = result;
      console.log(this.selectedFoodList);
      // je reaffiche le total des calories pour cette journée en faisant une boucle sur la colone total
      this.totalCalories = 0;
      for (let i = 0; i < this.selectedFoodList.length; i++) {
        // console.log(this.selectedFoodList[i]);
        this.totalCalories += (this.selectedFoodList[i].food.calories) * (this.selectedFoodList[i].quantity);
        console.log("subtotal " + this.totalCalories);
      }

    });

  }

//fonction ci dessous pour reagir au changement de selection de l'aliment dans le menu deroulant:


  changeFood($event: Event) {

    //je selectionne un aliment dans mon menu deroulant et je charge la liste de tous les aliments
    this.api.getFoodList().subscribe(result => {
      console.log(result);
      // @ts-ignore
      this.food = result;
      //je recupere le detail l'aliment selectionné
      this.food = this.foodDiaryForm.get('fooddetail')?.value;
      console.log(this.food);

    })
  }



  addfoodline() {
    console.log(this.foodDiaryForm.get('fooddetail')?.value);
    //je crée un objet foodIntake - // 1 foodIntake = 1 ligne du tableau

    this.foodIntake =
      {
        // @ts-ignore
        id: null,
        date: this.foodDiaryForm.get('date')?.value,
        quantity: this.foodDiaryForm.get('quantity')?.value,
        food: this.foodDiaryForm.get('fooddetail')?.value,
        appuser:this.foodDiaryForm.get('appuserdetail')?.value,
      }

    console.log("test click bouton ajouter");

    //j'ajoute une nouvelle ligne à chaque clic ( + *ngFor côté HTML) :

    if (this.foodIntake) {
      this.selectedFoodList.push(this.foodIntake);
      //je calcule au fur et a mesure le total des calories en récupérant les valeurs de la cellule
      // @ts-ignore
      this.totalCalories = this.totalCalories + (this.foodIntake.quantity * this.foodIntake.food.calories);
      console.log("test " + this.totalCalories);
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

    //on vide le tableau apres avoir sauvegardé
    this.foodDiaryForm.reset();

    //je vide en meme temps egalement le contenu du tableau
    this.selectedFoodList.splice(0, this.selectedFoodList.length);
    this.totalCalories = 0;
  }

  addDay(daysIncrement: number) {
    //je récupère le user selectectionné dans la formulaire
   const appUserId= this.foodDiaryForm.get('appuserdetail')?.value.id;
    // console.log(this.appUser);
     //je recupere la date selectionnée dans le calendrier
    this.dateSelected = this.foodDiaryForm.get("date")?.value;
    console.log(this.dateSelected);
//j'ajoute ou je supprime un jour au clic du bouton pour naviguer dans le calendrier
    let previousOrFollowingDay = new Date(this.dateSelected);
    previousOrFollowingDay.setDate(previousOrFollowingDay.getDate() + daysIncrement);
    console.log(previousOrFollowingDay);
    //je change le format de la date recuperee et je l'insere dans le formulaire
    let moveDate = this.datepipe.transform(previousOrFollowingDay, 'yyyy-MM-dd');
    console.log(moveDate);
    this.foodDiaryForm.get('date')?.setValue(moveDate);
    //je recupere la date selectionnée dans le calendrier
    this.dateSelected = this.foodDiaryForm.get("date")?.value;
    //j'appelle l'API pour recuperer la liste des foodIntake sur cette journée
    this.api.getFoodIntakeByDateandAppuser(this.dateSelected,appUserId).subscribe(result => {
      //je recupere le detail des foodintake trouvés dans le resultat et je stocke le resultat
      this.selectedFoodList = result;
      console.log(this.selectedFoodList);
      // je reaffiche le total des calories pour cette journée en faisant une boucle sur la colone total
      this.totalCalories = 0;
      for (let i = 0; i < this.selectedFoodList.length; i++) {
        // console.log(this.selectedFoodList[i]);
        this.totalCalories += (this.selectedFoodList[i].food.calories) * (this.selectedFoodList[i].quantity);
        console.log("subtotal " + this.totalCalories);
      }

    });


     }

}
