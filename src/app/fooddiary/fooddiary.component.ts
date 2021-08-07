import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../api.service";
import {Food} from "../food";

@Component({
  selector: 'app-fooddiary',
  templateUrl: './fooddiary.component.html',
  styleUrls: ['./fooddiary.component.css']
})
export class FooddiaryComponent implements OnInit {
  foodDiaryForm= this.formBuilder.group({
    diaryDate:'',
    name:'',
    quantity:'',
    unit:'',
  });

  //ici , je defini a quoi correspond la food liste que j'appelle dans mon menu deroulant côté HTML
  foodList= this.api.getFoodList();







  constructor(private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {

   ;
  }

  foodDiarySave() {
  console.log("test click") ;


  // a completer



  }
}
