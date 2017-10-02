import { Component } from '@angular/core';

@Component({
  selector: 'app-fmms',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {

  get isLoggedIn() {
    return true;
  }

}
