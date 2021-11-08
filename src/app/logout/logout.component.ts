import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  deconnexionOK=false


  constructor(private  api: ApiService,private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.api.signOut();
    this.deconnexionOK=true;
  }


}
