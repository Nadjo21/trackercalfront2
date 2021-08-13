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


  // Je crée mon objet JS qui représente le formulaire d'édition de l'enregistrement de mes données
  weightForm = this.formBuilder.group({
    weight: '',
  measurementDate:'',

  });

  private weight: any;
  private measurementDate: any  ;

    constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {

  }

  weightSave() {





// Je créer un objet Weight  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base

    this.weight = {id: null,
                   weight :  this.weightForm.get('weight')?.value,
                   measurementDate :this.weightForm.get('measurementDate')?.value};


    console.log("test click  : " + this.weight.measurementDate);


    //j'appelle l'API :

  this.api.createWeight(this.weight).subscribe(weightcreate => {

    console.log(this.weight);


  })



  }
}
