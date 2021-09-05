import {Component, OnInit} from '@angular/core';
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
    type: '',
    calories: '',

  });

  private food: any;
  private name: any;
  private quantity: any;
  private type: any;
  private calories: any;


  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
  }


  // Gestion de l'événement clic sur "modifier" ==> je remplis les champs du formulaire
  onEditFood(food: Food) {
    console.log("test clic modifier");
    this.foodForm.patchValue({
      name: '',
      quantity: '',
      type: '',
      calories: '',
    })
//Remplissage de l'attribut Food
    this.food = food;
  }


  //gestion de la sauvegarde d'un food existant
  onFoodSave() {
// Si ma propriété food est définie, alors je peux le mettre à jour
    if (this.food) {
      // Je récupère les propriétés de decor qui viennent du formulaire
      this.food.name = this.foodForm.get('name')?.value;
      this.food.quantity = this.foodForm.get('quantity')?.value;
      this.food.type = this.foodForm.get('type')?.value;
      this.food.calories = this.foodForm.get('calories')?.value;

      // Je sauve food
      this.api.updateFood(this.food).subscribe(savedFood => {
        console.log("L'aliment a bien été mis à jour");
        this.foodList = this.api.getFoodList()
      });
    } else {

// Je créer un objet Food  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base
      this.food = {
        id: null,
        name: this.foodForm.get('name')?.value,
        quantity: this.foodForm.get('quantity')?.value,
        type: this.foodForm.get('type')?.value,
        calories: this.foodForm.get('calories')?.value
      };

      //j'appelle l'API pour sauvegarder food:

      this.api.createFood(this.food).subscribe(foodcreate => {
        console.log("l'aliment a bien été sauvegardé");
        //je reaffiche dynamiquement la liste
        this.foodList = this.api.getFoodList();
      })
    }
  }

  // On vide le formulaire sur le clic du bouton
  onFoodCreate() {
    this.foodForm.reset();
    this.food = null;
  }


  onFoodDelete(id: number) {
    // J'envoie la demande à l'API pour supprimer l'aliment' (par son id) et je recharge la liste
    this.api.deleteFoodById(id).subscribe(() => {
        console.log("L'aliment" + id + " a bien été supprimé\"");
        this.foodList = this.api.getFoodList();
      },
      () => console.log("Erreur à la suppression de l'aliment,  vérifier que cet aliment n'est pas rattaché à foodIntake"));

  }

}
