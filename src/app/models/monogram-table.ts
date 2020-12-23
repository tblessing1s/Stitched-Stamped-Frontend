export class MonogramTable {
  orderId: number;
  itemName: string;
  monogram: string;
  customer: string;
  status: string;

  public constructor(init?: Partial<MonogramTable>) {
    Object.assign(this, init);
  }
}
