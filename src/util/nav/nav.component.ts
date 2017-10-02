import {Component} from '@angular/core';
import {AppComponent} from '../../app/app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class NavComponent {
  constructor(public app: AppComponent, private router: Router) {
  }

}
