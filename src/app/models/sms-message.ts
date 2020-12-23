export class SmsMessage {
  to: string;
  message: string;

  public constructor(init?: Partial<SmsMessage>) {
    Object.assign(this, init);
  }
}
