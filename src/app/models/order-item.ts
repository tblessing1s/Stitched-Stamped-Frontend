import {PurchaseOrder} from './purchase-order';
import {Monogram} from './monogram';
import {SpecialOrder} from './special-order';

export class OrderItem {
  purchaseOrder: PurchaseOrder;
  monogram?: Monogram;
  specialOrder?: SpecialOrder;
  signature: string;
  status: string;

  public constructor(init?: Partial<OrderItem>) {
    Object.assign(this, init);
  }
}
