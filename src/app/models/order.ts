import {Customer} from './customer';
import {OrderSource} from './order-source.enum';

export class Order {
  customer: Customer;
  orderSource: OrderSource = OrderSource.InStore;
}
