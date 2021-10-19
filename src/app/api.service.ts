import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weight} from "./weight";
import {Food} from "./food";
import {Foodintake} from "./foodintake";
import {Observable} from "rxjs";
import {Appuser} from "./appuser";
import {Credentials} from "./model/credentials";
import {Jwt} from "./model/jwt";
import {tap} from "rxjs/operators";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl = "https://localhost:8080/";


  static readonly JWT_STORAGE_KEY = 'JWT_QUOTES_API';
  private readonly AUTH_ENDPOINT = environment.baseApiUrl + 'authentication/';
  //private readonly USER_ENDPOINT = environment.baseApiUrl + 'admin/users';





  constructor(private http: HttpClient) {
  }

// Méthode pour enregistrer une saisie "poids/date"
  createWeight(weight: Weight) {
    return this.http.post(this.baseApiUrl + 'api/weightmeasurement', weight);
  }

//Methode pour récupérer l'historique des saisies " poids/date"
  getWeightList() {
    return this.http.get<Weight[]>(this.baseApiUrl + 'api/weightmeasurement')
  }

  //recuperer des weight en fonction  du user selectionné

  getWeightByAppuser( Appuserid: number|undefined): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.baseApiUrl + 'api/weightmeasurement/' + Appuserid)
  }


//Methode pour récupérer la liste des aliments
  getFoodList() {
    return this.http.get<Food[]>(this.baseApiUrl + 'api/food')
  }

  //Methode pour récupérer un aliment par son ID ( pour utilisation dans le fomualire de saisie des repas)
  getFoodById(Foodid: number | undefined) {
    return this.http.get<Food[]>(this.baseApiUrl + 'api/food/' + Foodid)
  }

//Methode pour récupérer la liste des appusers
  getAppuserList() {
    return this.http.get<Appuser[]>(this.baseApiUrl + 'api/appuser')
  }

  //Methode pour récupérer un appuser par son ID
  getAppuserById(Appuserid: number | undefined) {
    return this.http.get<Appuser[]>(this.baseApiUrl + 'api/appuser/' + Appuserid)
  }

  //Methode pour supprimer un aliment

  deleteFoodById(Foodid: number) {
    return this.http.delete<Food[]>(this.baseApiUrl + 'api/food/' + Foodid)
  }

  //methode pour ajouter un aliment
  createFood(food: Food) {
    return this.http.post(this.baseApiUrl + 'api/food', food);
  }

  // Méthode pour mettre à jour un aliment
  updateFood(food: Food) {
    return this.http.put(this.baseApiUrl + 'api/food', food);
  }

  //Methode pour enregistrer les repas pris( foodIntake)

  createFoodIntake(foodIntake: Foodintake ) {
    return this.http.post(this.baseApiUrl + 'api/foodintake', foodIntake);
  }

  //recuperer la liste des foodIntake

  getFoodIntakeList() {
    return this.http.get<Foodintake[]>(this.baseApiUrl + 'api/foodintake')
  }

  //recuperer les foodintake en fonction de la date
  //
  // getFoodIntakeByDate(FoodIntakeDate: Date | undefined): Observable<Foodintake[]> {
  //   return this.http.get<Foodintake[]>(this.baseApiUrl + 'api/foodintake/foodintakebydate?date=' + FoodIntakeDate)
  // }


  //recuperer les foodintake en fonction de la date et du user selectionné

  getFoodIntakeByDateandAppuser(FoodIntakeDate: Date | undefined , Appuserid: number|undefined): Observable<Foodintake[]> {
      return this.http.get<Foodintake[]>(this.baseApiUrl + 'api/foodintake/foodintakebydateandappuser/'+ Appuserid + '/?date=' + FoodIntakeDate)
  }


  // pour JWT

  getRoles(): string[] {
    const jwt = sessionStorage.getItem(ApiService.JWT_STORAGE_KEY);

    if (jwt) {
      // On décode la partie payload du token
      const tokenPayload = JSON.parse(atob(jwt.split('.')[1]));
      // On retourne les rôles
      return tokenPayload.auth.split(",")
    }
    return [];
  }

  signIn(credentials: Credentials): Observable<Jwt> {
    return this.http.post<Jwt>(this.AUTH_ENDPOINT + "signin", credentials).pipe(
      tap(jwt => {
        sessionStorage.setItem(ApiService.JWT_STORAGE_KEY, jwt.idToken);
      }));
  }


  signUp(appUser: Appuser): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + "api/signup", appUser);
  }


}

