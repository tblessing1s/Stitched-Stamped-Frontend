import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchaseOrderFormComponent} from './purchase-order-form.component';
import {AppModule} from '../../../app.module';
import {PurchaseOrderService} from '../../../services/purchase-order/purchase-order.service';
import {createStub} from '../../../shared/spec-helper/provide-stub.spec-helper';
import {CustomerService} from '../../../services/customer/customer.service';
import {buildCustomer, buildOrder} from '../../../shared/spec-helper/object-builder';
import {of} from 'rxjs';

describe('OrderFormComponent', () => {
  let component: PurchaseOrderFormComponent;
  let fixture: ComponentFixture<PurchaseOrderFormComponent>;
  let mockOrderService: PurchaseOrderService;
  let mockCustomerService: CustomerService;

  beforeEach(async(() => {
    mockOrderService = createStub(PurchaseOrderService);
    mockCustomerService = createStub(CustomerService),
      TestBed.configureTestingModule({
        imports: [AppModule],
        declarations: [PurchaseOrderFormComponent],
        providers: [
          {provide: PurchaseOrderService, useClass: mockOrderService},
          {provide: CustomerService, useClass: mockCustomerService}
        ]
      })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit Test', () => {
    it('should Create An PurchaseOrder', () => {
      const order = buildOrder();
      component.purchaseOrder = null;
      spyOn(mockCustomerService, 'getCustomers').and.returnValue(of([buildCustomer()]));
      spyOn(mockOrderService, 'createNewOrder').and.returnValue(of(order));

      component.createOrder();

      expect(component).toBeTruthy();
    });
  });
});
