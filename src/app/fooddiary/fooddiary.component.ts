import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api.service";



@Component({
  selector: 'app-fooddiary',
  templateUrl: './fooddiary.component.html',
  styleUrls: ['./fooddiary.component.css']
})
export class FooddiaryComponent implements OnInit {
  foodDiaryForm= this.formBuilder.group({
    date:'',
    name:'',
    quantity:'',
    type:'',
    calories:'',
  });

  //ici , je defini a quoi correspond la food liste que j'appelle dans mon menu deroulant côté HTML
  foodList= this.api.getFoodList();
  foodintake: any;
  private name: any;
  private quantity: any;
  private type: any;
  private calories: any;

  private date: any;
  foodname: any;
  //getvalue: any;
  private select: any;
  private food: any;





  constructor(private formBuilder : FormBuilder, private api : ApiService) { }


  ngOnInit(): void {


  }

  foodDiarySave() {


  console.log("test click") ;


  // a completer

  }
//TODO permettre l'ajout de plusierus lignes et calculer les calories en focntion de l quantité renseignée




  addfoodline() {
    this.foodintake =

    {id: null,
      date: this.date=this.foodDiaryForm.get('date')?.value,
      name : this.foodname= this.foodDiaryForm.get('name')?.value,
      quantity : this.quantity = this.foodDiaryForm.get('quantity')?.value,
       type : this.type = this.foodDiaryForm.get('type')?.value,
       calories : this.calories = this.foodDiaryForm.get('calories')?.value}

    console.log(this.foodintake);



    //this.foodDiaryForm.reset()

  }



}
