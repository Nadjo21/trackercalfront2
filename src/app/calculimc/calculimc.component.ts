import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";



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
  Imc: any;

//je declare le displayresult par defaut a false , afin de generer l'affichage du resultat au clic du bouton
displayResult = false;





  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  imcSave() {
        //je calcule  mon Imc en fonction des paramètre renseigné dans le formulaire ;

    this.height = this.imcForm.get('heightF')?.value;
    this.weight = this.imcForm.get('weightF')?.value;
    this.Imc = this.weight / (this.height * this.height);




    // je passe le displayResult a true pour afficher la section de resultat côté HTML
     this.displayResult = true;





  }




}


