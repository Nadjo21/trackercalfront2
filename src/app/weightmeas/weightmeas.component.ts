import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api.service";
import {Weight} from "../weight";

@Component({
  selector: 'app-pesee',
  templateUrl: './weightmeas.component.html',
  styleUrls: ['./weightmeas.component.css']
})
export class WeightmeasComponent implements OnInit {

 // weightList = this.api.getWeightList();


  // Je crée mon objet JS qui représente le formulaire d'édition de l'enregistrement de mes données
  weightForm = this.formBuilder.group({
    weight: '',
  measurementDate:'',

  });

  private weight: any;
  private measurementDate: any |'dd/MM/yyyy';

    constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {

  }

  weightSave() {
console.log("test click)");




// Je créer un objet Weight  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base

    this.weight = {id: null,
                   weight : this.weight = this.weightForm.get('weight')?.value,
                   measurementDate : this.measurementDate =this.weightForm.get('measurementDate')?.value};


    //j'appelle l'API :

  this.api.createWeight(this.weight).subscribe(weightcreate => {

    console.log(this.weight);


  })



  }
}
