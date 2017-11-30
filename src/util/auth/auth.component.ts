import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app/app.component';
import {BackendService} from '../../app/backend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent implements OnInit {

  username: string;
  password: string;
  message: string;

  constructor(private app: AppComponent,
              private backend: BackendService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    this.username = '';
    this.password = '';
    this.message = '';
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data.logout) {
        this.app.logout();
        this.router.navigate(['/']);
      } else if (this.app.isLoggedIn) {
        this.username = this.app.username;
        this.password = this.app.password;
        this.login();
      }
    });
  }

  login() {
    this.app.logout();

    if (this.username.length > 0 && this.password.length > 0) {
      this.backend.testAuth(this.username, this.password).subscribe((status) => {
        if (status) {
          this.app.login(this.username, this.password);
          this.location.back(); // Back to last action
        } else {
          this.message = 'Invalid username or password';
        }
      });
    } else {
      this.message = 'Please fill in username and password.';
    }
  }
}
