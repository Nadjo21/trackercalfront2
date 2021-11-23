import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Options} from '@angular-slider/ngx-slider';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-calculimc',
  templateUrl: './calculimc.component.html',
  styleUrls: ['./calculimc.component.css']
})
export class CalculimcComponent implements OnInit {


  // Je crée mon objet JS qui représente le formulaire d'édition du calcul de mon IMC
  imcForm = this.formBuilder.group({
    heightF: '',
    weightF: '',
  });

  height: any;
  weight: any;
  imc:  any;

//je declare le displayresult par defaut a false , afin de generer l'affichage du resultat au clic du bouton
  displayResult = false;

  value: number | any;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 16.5, legend: "Maigreur"},
      {value: 18.5, legend: "Corpulence normale"},
      {value: 25, legend: "Surpoids"},
      {value: 30, legend: "Obésité modérée"},
      {value: 35, legend: "Obésité Sévère"},
      {value: 40, legend: " "},
    ]
  };

  constructor(private formBuilder: FormBuilder, private  api: ApiService,private router: Router) {
  }

  ngOnInit(): void {

  }

  imcSave() {
    //je calcule  mon Imc en fonction des paramètre renseigné dans le formulaire ;
    this.height = this.imcForm.get('heightF')?.value;
    this.weight = this.imcForm.get('weightF')?.value;
    this.imc = this.weight / (this.height * this.height);
    // je passe le displayResult a true pour afficher la section de resultat côté HTML
    this.displayResult = true;
    this.value = this.imc;
  }


}


