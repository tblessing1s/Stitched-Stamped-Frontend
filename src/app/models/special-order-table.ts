export class SpecialOrderTable {
  orderId: number;
  itemName: string;
  brand: string;
  size: string;
  itemColor: string;
  customer: string;

  public constructor(init?: Partial<SpecialOrderTable>) {
    Object.assign(this, init);
  }
}
