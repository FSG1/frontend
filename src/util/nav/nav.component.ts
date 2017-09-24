import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app/app.component";
import {Router} from "@angular/router";
import {UserService} from "../../service/UserService";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class NavComponent implements OnInit {

  username: string;

  constructor(public app: AppComponent, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.username = this.app.user.username;
  }

  onLogout() {
    this.userService.logout().subscribe();
    this.app.logout();
    this.router.navigate(["/login"]);
  }
}
