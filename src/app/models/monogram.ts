export class Monogram {
  itemName: string;
  font: string;
  threadColor: string;
  placement: string;
  monogram: string;
  designNotes: string;

  public constructor(init?: Partial<Monogram>) {
    Object.assign(this, init);
  }
}
