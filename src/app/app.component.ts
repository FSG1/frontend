import { Component } from '@angular/core';

@Component({
  selector: 'app-fmms',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {

  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  get isLoggedIn(): boolean {
    return this.username.length > 0 && this.password.length > 0;
  }

  setCredentials(username: string, password: string) {
    if (username !== null && password !== null) {
      this.username = username;
      this.password = password;
    } else {
      this.username = '';
      this.password = '';
    }
  }
}
