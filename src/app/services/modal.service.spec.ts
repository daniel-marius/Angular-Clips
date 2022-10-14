import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', (): void => {
  let service: ModalService;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });
});
