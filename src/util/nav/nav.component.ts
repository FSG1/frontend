import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../app/app.component';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  curriculumView = false;
  qualificationsView = false;

  constructor(public app: AppComponent, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.router.events.filter((event) => (event instanceof NavigationEnd)).subscribe((event) => {
      const url = (event as NavigationEnd).urlAfterRedirects;
      this.curriculumView = false;
      this.qualificationsView = false;

      if (url.startsWith('/qualifications')) {
        this.qualificationsView = true;
      } else if (url.startsWith('/moduleoverview')) {
        this.curriculumView = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.app.logout();
  }
}
