import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api.service";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Color, Label} from "ng2-charts";
import {Weight} from "../weight";
import {Appuser} from "../appuser";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-pesee',
  templateUrl: './weightmeas.component.html',
  styleUrls: ['./weightmeas.component.css'],
  providers: [DatePipe],
})
export class WeightmeasComponent implements OnInit {

  // Je crée mon objet JS qui représente le formulaire d'édition de l'enregistrement de mes données
  weightForm = this.formBuilder.group({
    appuserdetail: '',
    weight: '',
    measurementDate: '',
  });

  private weight: any;
  private measurementDate: any;
  private myData: any;
  weightData: Weight[] | any;
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


  appUserList = this.api.getAppuserList();
  private appUser: Appuser | any;

  currentDate = new Date();

  constructor(private formBuilder: FormBuilder, private api: ApiService, public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    let dDay = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
      //j'insere la date au bon format dans le formulaire
    this.weightForm.get('measurementDate')?.setValue(dDay);
  }


  changeAppUser($event: Event) {
    //je recupere le detail de l'appuser selectionné
    this.appUser = this.weightForm.get('appuserdetail')?.value.id;
    //je récupere la liste des weight pour ce user et je stocke le résultat
    this.api.getWeightByAppuser(this.appUser).subscribe(result => {
      this.weightData = result;
      //je fais une boucle pour recuperer les valeurs de ma colonne weight et je les stock
      for (let weight of this.weightData) {
        this.myStoredWeight.push(weight.weight);
      }
      //je fais une boucle pour recuperer les valeurs de ma colonne date
      for (let date of this.weightData) {
        this.myStoredDate.push(date.measurementDate);
        //je converti les dates aux formats attendus
        this.lineChartLabels.push(date.measurementDate.toString());
      }
    })

    // j 'ai declaré le type du lineChartDate plus haut ( declarations) - ci dessous affectation valeur
    this.lineChartData = [
      {data: this.myStoredWeight, label: 'Ma progression'},
    ];
    this.lineChartOptions = {
      annotation: undefined,
      responsive: true
    };
    this.lineChartColors = [
      {
        borderColor: 'rgba(255, 206, 86, 0.2)',
        backgroundColor: 'rgba(255,255,0,0.28)'
      },
    ];
    this.lineChartLegend = true;
    let lineChartType = 'line';
    this.lineChartPlugins = [];
    this.displayconfirmation = true;
  };

  weightSave() {
// Je créer un objet Weight  pour pouvoir sauvegarder les données saisies dans le formulaire dans la base
    this.weight = {
      id: null,
      weight: this.weightForm.get('weight')?.value,
      measurementDate: this.weightForm.get('measurementDate')?.value,
      appuser: this.weightForm.get('appuserdetail')?.value,
    };
    console.log("test click  : " + this.weight.appuser.id);

    //pour enregistrer un nouveau poids ,je consomme mon API :
    this.api.createWeight(this.weight).subscribe(weightcreate => {
      console.log(this.weight);


    })
  }

}


