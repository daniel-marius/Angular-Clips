import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  isModalOpen(id: string): boolean {
    // return Boolean(this.modals.find((element: IModal) => element.id === id)?.visible);
    return !!this.modals.find((element: IModal) => element.id === id)?.visible;
  }

  register(id: string): void {
    this.modals.push({
      id,
      visible: false,
    });
  }

  toggleModal(id: string): void {
    const modal: IModal = this.modals.find(
      (element: IModal) => element.id === id
    ) as IModal;

    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  unregister(id: string) {
    this.modals = [...this.modals].filter(
      (element: IModal) => element.id !== id
    );
  }
}
