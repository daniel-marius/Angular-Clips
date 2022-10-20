import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  isAuth$: Observable<boolean> = this.auth.isAuthenticated$;

  constructor(
    private modal: ModalService,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  async logout($event: Event): Promise<void> {
    $event.preventDefault();
    await this.afAuth.signOut();
  }

  openModal($event: Event): void {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }
}
