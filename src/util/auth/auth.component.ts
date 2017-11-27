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
        localStorage.removeItem('fmms-username');
        localStorage.removeItem('fmms-password');
        this.app.setCredentials('', '');
        this.router.navigate(['/']);
      } else {
        const u = localStorage.getItem('fmms-username');
        const p = localStorage.getItem('fmms-password');
        if (u !== null && u.length > 0 && p !== null && p.length > 0) {
          this.username = u;
          this.password = p;
          this.login();
        }
      }
    });
  }

  login() {
    localStorage.removeItem('fmms-username');
    localStorage.removeItem('fmms-password');
    this.app.setCredentials('', '');

    if (this.username.length > 0 && this.password.length > 0) {
      this.backend.testAuth(this.username, this.password).subscribe((status) => {
        if (status) {
          this.app.setCredentials(this.username, this.password);
          localStorage.setItem('fmms-username', this.username);
          localStorage.setItem('fmms-password', this.password);
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
