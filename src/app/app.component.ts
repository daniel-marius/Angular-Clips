import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-clips';
  userAuth$ = this.auth.isAuthenticatedWithDelay$;

  constructor(private auth: AuthService) {}
}
