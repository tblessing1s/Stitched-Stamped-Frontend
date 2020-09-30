import {Customer} from '../../models/customer';
import {PurchaseOrder} from '../../models/purchase-order';
import {OrderSource} from '../../models/order-source.enum';

export function buildCustomer(overrides: Partial<Customer> = {}): Customer {
  const original: Customer = {
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'Email',
    phone: 'Phone'
  };

  return Object.assign(original, overrides);
}

export function buildOrder(overrides: Partial<PurchaseOrder> = {}): PurchaseOrder {
  const original: PurchaseOrder = {
    id: 1,
    customer: buildCustomer(),
    orderSource: OrderSource.InStore
  };

  return Object.assign(original, overrides);
}
