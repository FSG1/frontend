import {AfterContentInit, Component} from '@angular/core';
import {AppComponent} from "../app/app.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginResponse} from "../models/ApiResponses";
import {ApiClient} from "../util/ApiClient";

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements AfterContentInit {

  username: string;
  password: string;

  constructor(private app: AppComponent, private http: ApiClient, private router: Router) {
  }

  ngAfterContentInit() {
    if (this.app.isLoggedIn) {
      this.router.navigate(["/newsletter"]);
    }
  }

  public onLogin() {

    if (!this.username || !this.password || this.username.length === 0 || this.password.length === 0) {
      this.app.showError("Eingabe fehlt!!", "Bitte füllen Sie alle Felder aus.");
      return;
    }

    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<LoginResponse>("/login", body).subscribe(data => {
      if (data.token && data.user) {
        if (this.app.setUser(data)) {
          this.router.navigate(["/newsletter"]);
        } else {
          // Sollte bei frischen Login nie passieren
          this.app.showError("Fehler!!", "Access Token is ungültig.");
        }
      } else {
        this.app.showError("Fehler!!", "Ein unerwarteter Fehler ist aufgetreten.");
        console.error(data);
      }
    }, (err: HttpErrorResponse) => {
      switch (err.status) {
        case 403: // Forbidden
          this.app.showError("Fehler!!", "Ihr Benutzer Account wurde noch nicht aktiviert. Bitte wenden Sie sich an den Administrator.");
          break;

        case 404: // not found
          this.app.showError("Fehler!!", "Ungültiger Benutzername oder falsches Passwort.");
          break;

        case 400: // Bad request
        default:
          console.error(err);
          break;
      }
      console.error(err.status + " - " + err.statusText);
    });

  }

}
