import { Pipe, PipeTransform } from '@angular/core';
import {Customer} from '../../../models/customer';
import {Validation} from '../../validators/validation';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  validation = new Validation();

  transform(customers: any[], search: string): any[] {
    if (!customers) { return []; }
    // if (!search.match(this.validation.phoneValidation)) {return []; }
    if (!search) { return customers; }
    return customers.filter( customer => {
      return customer.includes(customer);
    });
  }

}
