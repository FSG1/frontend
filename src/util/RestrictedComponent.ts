
import {AppComponent} from '../app/app.component';
import {Router} from '@angular/router';

export class RestrictedComponent {
  constructor(protected app: AppComponent, protected router: Router) {
    this.checkAuth();
  }

  protected checkAuth(): void {
    if (!this.app.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
