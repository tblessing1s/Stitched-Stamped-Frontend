import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderFormComponent} from './order-form.component';
import {AppModule} from '../../app.module';
import {OrderService} from '../../services/order/order.service';
import {createStub} from '../../shared/spec-helper/provide-stub.spec-helper';
import {CustomerService} from '../../services/customer/customer.service';
import {Order} from '../../models/order';
import {buildCustomer, buildOrder} from '../../shared/spec-helper/object-builder';
import {of} from 'rxjs';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let mockOrderService: OrderService;
  let mockCustomerService: CustomerService;

  beforeEach(async(() => {
    mockOrderService = createStub(OrderService);
    mockCustomerService = createStub(CustomerService),
      TestBed.configureTestingModule({
        imports: [AppModule],
        declarations: [OrderFormComponent],
        providers: [
          {provide: OrderService, useClass: mockOrderService},
          {provide: CustomerService, useClass: mockCustomerService}
        ]
      })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit Test', () => {
    it('should Create An Order', () => {
      const order = buildOrder();
      component.order = null;
      spyOn(mockCustomerService, 'getCustomers').and.returnValue(of([buildCustomer()]));
      spyOn(mockOrderService, 'createNewOrder').and.returnValue(of(order));

      component.createOrder();

      expect(component).toBeTruthy();
    });
  });
});
