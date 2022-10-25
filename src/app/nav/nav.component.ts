import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  isAuth$: Observable<boolean> = this.auth.isAuthenticated$;

  constructor(private modal: ModalService, private auth: AuthService) {}

  ngOnInit(): void {}

  async logout($event: Event): Promise<void> {
    this.auth.logout($event);
  }

  openModal($event: Event): void {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }
}
