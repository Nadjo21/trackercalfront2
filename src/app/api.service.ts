import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weight} from "./weight";
import {Observable} from "rxjs";

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

}
