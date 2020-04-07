import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {Observable} from 'rxjs';
import {Customer} from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerEndpoint = 'api/customer';

  constructor(private httpWrapper: HttpClientWrapperService) { }

  createNewCustomer(customer: Customer): Observable<Customer> {
    return this.httpWrapper.post<Customer>(customer, this.customerEndpoint);
  }

  getCustomers(): Observable<Customer[]> {
    return this.httpWrapper.get(this.customerEndpoint);
  }
}
