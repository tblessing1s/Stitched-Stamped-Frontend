export class Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }
}
