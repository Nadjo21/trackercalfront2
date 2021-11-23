import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn() {
    if (sessionStorage.getItem('JWT_QUOTES_API')) {
      return true
    } else {
      return false
    }
  }


}
