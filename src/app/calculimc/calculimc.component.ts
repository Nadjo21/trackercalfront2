import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Imc} from "../imc";


@Component({
  selector: 'app-calculimc',
  templateUrl: './calculimc.component.html',
  styleUrls: ['./calculimc.component.css']
})
export class CalculimcComponent implements OnInit {

  // Je déclare mon attribut imc ??? utile si pas de "modele" IMC côté back ?
  imc: Imc | undefined;


  // Je crée mon objet JS qui représente le formulaire d'édition du calcul de mon IMC
  imcForm = this.formBuilder.group({
    heightF: '',
    weightF: '',
  });

  height: any;
  weight: any;
  Imc: any;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    // Quand mon composant est prêt
    // J'ai besoin de récupérer l'id du timeline sur lequel je veux jouer pour récupérer ses cartes
 //   const routeParams = this.route.snapshot.paramMap;
    //const imcheightFromRoute = Number(routeParams.get('height'));
    // const imcweightFromRoute = Number(routeParams.get('weight'));

    // this.height = this.route.snapshot.paramMap.get('heightF');
    // this.weight = this.route.snapshot.paramMap.get('weightF');


  }

  imcSave() {
        //je calcule  mon Imc en fonction des paramètre renseigné dans le formulaire ;

    this.height = this.imcForm.get('heightF')?.value;
    this.weight = this.imcForm.get('weightF')?.value;
    this.Imc = this.weight / (this.height * this.height);
  }
// completer en faisant apparaitre au clic un tableau ou une image reprenant le détail des valeurs de référence pour l'imc - ameliorer l'affichage
}


//
//       console.log("imc =" + this.Imc );
//     this.api.getMonImc(this.height, this.weight).subscribe(calculateImc => {
// this.Imc = this.weight / (this.height * this.height);
//
//       console.log("imc =" + this.Imc );
//     });
