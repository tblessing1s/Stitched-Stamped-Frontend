import {Customer} from './customer';
import {OrderSource} from './order-source.enum';

export class PurchaseOrder {
  id: number;
  customer: Customer;
  orderSource: OrderSource = OrderSource.InStore;

  public constructor(init?: Partial<PurchaseOrder>) {
    Object.assign(this, init);
  }
}
