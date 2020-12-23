import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {Observable} from 'rxjs';
import {Customer} from '../../models/customer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerEndpoint = 'customers';

  constructor(private httpWrapper: HttpClientWrapperService) { }

  createNewCustomer(customer: Customer): Observable<Customer> {
    return this.httpWrapper.post<Customer>(customer, this.customerEndpoint);
  }

  getCustomers(): Observable<any[]> {
    return this.httpWrapper.get<GetCustomersResponse>(this.customerEndpoint)
      .pipe(
        map(response => response._embedded.customers)
      );
  }

  getCustomer(href: any): Observable<any> {
    return this.httpWrapper.getHal(href);
  }

  getCustomerByPurchaseOrderId(purchaseOrderId: number): Observable<Customer> {
    return this.httpWrapper.get<Customer>(this.customerEndpoint + `/purchaseOrder/${purchaseOrderId}`);
  }
}

interface GetCustomersResponse {
  _embedded: {
    customers: Customer[];
    _links: {self: {href: string}};
  };
}
