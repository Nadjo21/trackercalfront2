import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api.service";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Color, Label} from "ng2-charts";
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
  private myData:any;


   w : Weight | undefined;
  myWeightData : Weight[] | undefined;

  //je declare le displayresult par defaut a false , afin de generer l'affichage du resultat au clic du bouton
  displayconfirmation = false;


  //ici code pour linechart

//code initial
//   public lineChartData: ChartDataSets[] = [
//     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ma progression' },
//   ];
//
//   public lineChartLabels: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];
//   public lineChartOptions: (ChartOptions & { annotation: any }) = {
//     annotation: undefined,
//     responsive: true
//   };
//   public lineChartColors: Color[] = [
//     {
//       borderColor: 'black',
//       backgroundColor: 'yellow',
//     },
//   ];
//   public lineChartLegend = true;
//   public lineChartType= 'line';
//   public lineChartPlugins = [];


  //readaptation


  myWeightList = this.api.getWeightList().subscribe( resultWeight => {
    //je stocke le resultat de l'API
    console.log(resultWeight);
//je recupere le résultat
    // @ts-ignore
    this.w= this.resultWeight;
    console.log(this.w);

    //si presence d'un objet w, je l'ajoute a ma liste
    if (this.w) {
      // @ts-ignore
      this.weightD.push(this.w);

      //je recupere uniqument la colonne liste des poids
      // @ts-ignore
      this.myWeightData= this.w.weight;
      console.log(this.myWeightData);
    }
  })

  public lineChartData: ChartDataSets[] = [

    // @ts-ignore
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ma progression' },
  ];

  public lineChartLabels: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'blue',
    },
  ];
  public lineChartLegend = true;
  public lineChartType= 'line';
  public lineChartPlugins = [];


  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {

  }

  weightSave() {





// Je créer un objet Weight  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base

    this.weight = {id: null,
                   weight :  this.weightForm.get('weight')?.value,
                   measurementDate :this.weightForm.get('measurementDate')?.value};


    console.log("test click  : " + this.weight.measurementDate);


    //pour enregistrer un nouveau poids ,je consomme mon API :

  this.api.createWeight(this.weight).subscribe(weightcreate => {

    console.log(this.weight);

    this.displayconfirmation =true;

  })



  }
}
