import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalId: string = 'auth';

  constructor(private modal: ModalService, private el: ElementRef) {}

  ngOnInit(): void {
    // with this we can separate child css from parent css
    document.body.appendChild(this.el.nativeElement);
  }

  isModalOpen(): boolean {
    return this.modal.isModalOpen(this.modalId);
  }

  closeModal(): void {
    this.modal.toggleModal(this.modalId);
  }
}
