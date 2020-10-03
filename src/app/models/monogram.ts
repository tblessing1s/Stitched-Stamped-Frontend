export class Monogram {
  id: number;
  itemName: string;
  font: string;
  threadColor: string;
  placement: string;
  monogram: string;
  designNotes: string;
  otherPlacement?: string;
  otherFont?: string;

  public constructor(init?: Partial<Monogram>) {
    Object.assign(this, init);
  }
}
