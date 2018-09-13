import { TestBed, inject } from '@angular/core/testing';

import { ProcesOrderService } from './proces-order.service';

describe('ProcesOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcesOrderService]
    });
  });

  it('should be created', inject([ProcesOrderService], (service: ProcesOrderService) => {
    expect(service).toBeTruthy();
  }));
});
