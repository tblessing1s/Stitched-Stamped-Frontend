import { TestBed } from '@angular/core/testing';

import { PurchaseOrderService } from './purchase-order.service';

describe('OrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseOrderService = TestBed.get(PurchaseOrderService);
    expect(service).toBeTruthy();
  });
});
