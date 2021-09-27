import {Component, OnInit} from '@angular/core';
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
    measurementDate: '',
  });

  private weight: any;
  private measurementDate: any;
  private myData: any;

  weightData: Weight[] | undefined;
  myStoredWeight: number [] = [];
  myStoredDate: Date [] = [];


  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any; }) | any;
  public lineChartColors: Color[] = [];
  public lineChartLegend: any;
  public lineChartPlugins: any;

  //je declare le displayresult par defaut a false , afin de generer l'affichage du resultat au clic du bouton
  displayconfirmation = false;


  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    //readaptation
    this.api.getWeightList().subscribe(resultWeight => {
      //je stocke le resultat de l'API
      this.weightData = resultWeight;
      //  console.log(this.weightData);

//je fais une boucle pour recuperer les valeurs de ma colonne weight
      for (let weight of this.weightData) {
        this.myStoredWeight.push(weight.weight);
      }
//console.log(this.myStoredWeight);

      //je fais une boucle pour recuperer les valeurs de ma colonne date
      for (let date of this.weightData) {
        this.myStoredDate.push(date.measurementDate);
        // de de toLocalDateString
        this.lineChartLabels.push(date.measurementDate.toString());

      }
      console.log(this.myStoredDate);

    })
// j 'ai declare le type du lineChartDate plus haut ( declarations) - ci dessous affectation valeur
    this.lineChartData = [
      {data: this.myStoredWeight, label: 'Ma progression'},
    ];

    //this.lineChartLabels = ['01/01/2021', '01/02/2021', '01/03/2021', '01/04/2021', '01/05/2021', '01/06/2021', '01/07/2021'];
    // this.lineChartLabels = [];


    // this.myDateToLabel= this.datepipe.transform(this.myStoredDate, 'yyyy-MM-dd');


    this.lineChartOptions = {
      annotation: undefined,
      responsive: true
    };
    this.lineChartColors = [
      {
        borderColor: 'white',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    this.lineChartLegend = true;
    let lineChartType = 'line';
    this.lineChartPlugins = [];


  }

  weightSave() {


// Je créer un objet Weight  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base

    this.weight = {
      id: null,
      weight: this.weightForm.get('weight')?.value,
      measurementDate: this.weightForm.get('measurementDate')?.value
    };


    console.log("test click  : " + this.weight.measurementDate);


    //pour enregistrer un nouveau poids ,je consomme mon API :

    this.api.createWeight(this.weight).subscribe(weightcreate => {

      console.log(this.weight);

      this.displayconfirmation = true;

    })


  }
}
