import { Pipe, PipeTransform } from '@angular/core';
import {parsePhoneNumber} from 'libphonenumber-js';

@Pipe({
  name: 'phoneFormatter'
})
export class PhoneFormatterPipe implements PipeTransform {

  transform(phoneValue: number | string): any {
    try {
      const phoneNumber = parsePhoneNumber(phoneValue + '');
      return phoneNumber.formatNational();
    } catch (error) {
      return phoneValue;
    }
  }

}
