import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api.service";
import {Food} from "../food";

@Component({
  selector: 'app-dataupdate',
  templateUrl: './dataupdate.component.html',
  styleUrls: ['./dataupdate.component.css']
})
export class DataupdateComponent implements OnInit {

  foodList = this.api.getFoodList();


  // Je crée mon objet JS qui représente le formulaire d'édition de l'enregistrement de mes données
  foodForm = this.formBuilder.group({
    name: '',
    quantity: '',
    type:'',
    calories:'',

  });

  private food: any;
  private name: any;
  private quantity: any;
  private type: any;
  private calories: any;


  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
  }


  onFoodDelete(id:number) {
    // J'envoie la demande à l'API pour supprimer l'aliment' (par son id) et je recharge la liste
    this.api.deleteFoodById(id).subscribe(() => {
        console.log("L'aliment" + id + " a bien été supprimé\"");
        this.foodList = this.api.getFoodList();
      },
      () => console.log("Erreur à la suppression de l'aliment,  vérifier que cet aliment n'est pas rattaché à repas saisi (food intake)"));

  }
  foodSave() {

// Je créer un objet Food  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base

    this.food = {id: null,
      name : this.name = this.foodForm.get('name')?.value,
      quantity : this.quantity = this.foodForm.get('quantity')?.value,
      type : this.type = this.foodForm.get('type')?.value,
      calories : this.calories = this.foodForm.get('calories')?.value}

    //j'appelle l'API :

    this.api.createFood(this.food).subscribe(foodcreate => {

      console.log(this.food);

      //je vide le formulaire

      this.foodForm.reset();

    })

  }





}
