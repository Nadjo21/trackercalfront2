import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weight} from "./weight";
import{Food} from "./food";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl="http://localhost:8080/";


  constructor(private http: HttpClient) { }

// Méthode pour enregistrer une saisie "poids/date"
  createWeight(weight: Weight) {
    return this.http.post(this.baseApiUrl + 'api/weightmeasurement',weight);
  }

//Methode pour récupérer l'historique des saisies " poids/date"
  getWeightList() {
    return this.http.get<Weight[]>(this.baseApiUrl + 'api/weightmeasurement')
  }


//Methode pour récupérer la liste des aliments
  getFoodList() {
    return this.http.get<Food[]>(this.baseApiUrl + 'api/food')
  }

  //Methode pour supprimer un aliment

  deleteFoodById(Foodid : number){
    return this.http.delete<Food[]>(this.baseApiUrl + 'api/food/' + Foodid)
  }


  //methode pour ajouter un aliment
  createFood(food: Food) {
    return this.http.post(this.baseApiUrl + 'api/food',food);
  }


}
