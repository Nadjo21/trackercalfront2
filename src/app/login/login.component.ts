import {Component, OnInit} from '@angular/core';

import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });




  constructor(private  api: ApiService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  onConnect() {

    this.api.signIn({
      username: this.username?.value,
      password: this.password?.value
    }).subscribe(() => this.router.navigate(['']));

  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
