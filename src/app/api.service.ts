import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weight} from "./weight";
import{Food} from "./food";
import {Foodintake} from "./foodintake";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl="http://localhost:8080/";


  constructor(private http: HttpClient) { }

// Méthode pour enregistrer une saisie "poids/date"
  createWeight(weight: Weight) {
    return this.http.post(this.baseApiUrl + 'api/weightmeasurement',weight );
  }

//Methode pour récupérer l'historique des saisies " poids/date"
  getWeightList() {
    return this.http.get<Weight[]>(this.baseApiUrl + 'api/weightmeasurement')
  }


//Methode pour récupérer la liste des aliments
  getFoodList() {
       return this.http.get<Food[]>(this.baseApiUrl + 'api/food')
  }

  //Methode pour récupérer un aliment par son ID ( pour utilisation dans le fomualire de saisie des repas)
  getFoodById(Foodid: number |undefined ) {
    return this.http.get<Food[]>(this.baseApiUrl + 'api/food/' + Foodid)
  }

  //Methode pour supprimer un aliment

  deleteFoodById(Foodid : number){
    return this.http.delete<Food[]>(this.baseApiUrl + 'api/food/' + Foodid)
  }

  //methode pour ajouter un aliment
  createFood(food: Food) {
    return this.http.post(this.baseApiUrl + 'api/food',food);
  }

  // Méthode pour mettre à jour un aliment
  updateFood(food: Food ) {
    return this.http.put(this.baseApiUrl + 'api/food', food);
  }

  //Methode pour enregistrer les repas pris( foodIntake)

  createFoodIntake(foodIntake: Foodintake | undefined){
    return this.http.post(this.baseApiUrl+'api/foodintake',foodIntake);
  }

  //recuperer la liste des foodIntake

  getFoodIntakeList() {
    return this.http.get<Foodintake[]>(this.baseApiUrl + 'api/foodintake')
  }

  //recuperer les foodintake en fonction de la date

  getFoodIntakeByDate(FoodIntakeDate: Date |undefined ) : Observable<Foodintake[]>{
    return this.http.get<Foodintake[]>(this.baseApiUrl + 'api/foodintake/foodintakebydate?date=' + FoodIntakeDate)
  }

}
