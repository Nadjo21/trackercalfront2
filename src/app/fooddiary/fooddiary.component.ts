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
  // @ts-ignore
  selectedFoodList: Foodintake [] = [];

  totalCalories=0;
  private selectedFood: any;

  currentDate = new Date() ;

  //pour retrouver le détail d'un foodIntake sur une date selectionnée
  //date: any |undefined;
  //theDayBeforeDdate: any | undefined;

  // @ts-ignore
  foodIntakeFoundByDate= this.api.getFoodIntakeByDate(this.date);

  private dateSelected: any;



  foodIntakeList = this.api.getFoodIntakeList();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }


  ngOnInit(): void {
console.log(this.currentDate);

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
    // 1 foodIntake = 1 ligne du tableau

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



      //je calcule au fur et a mesure le total des calories en récupérant les valeurs de la cellule
      // @ts-ignore
     this.totalCalories = this.totalCalories +(this.foodIntake.quantity * this.foodIntake.food.calories);
     console.log("test "+ this.totalCalories);
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
    //TODO vider egalement le contenu du tableau

  }

  addDay(daysIncrement : number) {
  //je recupere la date selectionnée dans le calendrier
    this.dateSelected=this.foodDiaryForm.get("date")?.value;
console.log (this.dateSelected );
//j'ajoute ou je supprime un jour au clic du bouton pour naviguer dans le calendrier
  let previousOrFollowingDay = new Date (this.dateSelected) ;
  previousOrFollowingDay.setDate(previousOrFollowingDay.getDate()+daysIncrement);
    console.log("hier "+ previousOrFollowingDay);

     //j'appelle l'API pour recuperer la liste des foodIntake sur cette journée



    // @ts-ignore
    this.foodIntakeFoundByDate= this.api.getFoodIntakeByDate(this.dateSelected).subscribe( ()=>{
      console.log("clic bouton " + previousOrFollowingDay  + "liste " + this.foodIntakeFoundByDate);



     // si je trouve un foodIntake dont la date concorde avec la date selectionnée , je l'ajoute a la liste et je l'affiche
         if (this.foodIntake ) {
           // @ts-ignore
           this.foodIntake=foodIntake;
           console.log("foodIntake "+ this.foodIntake);
           // @ts-ignore
           this.selectedFoodList.push(this.foodIntake);}
         console.log(this.selectedFoodList);


   });

  }

 }
