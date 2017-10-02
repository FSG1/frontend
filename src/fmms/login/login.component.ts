import {Component, AfterContentInit} from '@angular/core';
import {AppComponent} from '../../app/app.component';
import {Router} from '@angular/router';


@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements AfterContentInit {

  constructor(private app: AppComponent, private router: Router) {
  }

  ngAfterContentInit(): void {
    if (this.app.isLoggedIn) {
      this.router.navigate(['/start']);
    }
  }

}
