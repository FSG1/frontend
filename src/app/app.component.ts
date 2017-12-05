import { Component } from '@angular/core';

@Component({
  selector: 'app-fmms',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {

  get username(): string {
    return localStorage.getItem('fmms-username');
  }

  get password(): string {
    return localStorage.getItem('fmms-password');
  }

  get isLoggedIn(): boolean {
    if (this.username !== null && this.password !== null) {
      return this.username.length > 0 && this.password.length > 0;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('fmms-username');
    localStorage.removeItem('fmms-password');
  }
  login(username: string, password: string) {
    localStorage.setItem('fmms-username', username);
    localStorage.setItem('fmms-password', password);
  }
}
